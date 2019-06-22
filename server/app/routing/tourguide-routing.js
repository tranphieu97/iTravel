// Include js file
const database = require('../database.js');
const config = require('../../_config.js');
const authentication = require('../authentication.js');
var ObjectId = require('mongodb').ObjectId;

// Import models file
const { Tour } = require('../../model/mongoose/models')

// Get app instance from index
const app = require('../../index');
const notificationService = require('../services/notification-service');

// Routing - START
app.post('/tourguide/add-location', (req, res) => {
    const location = req.body;

    if (location.locationName !== '' && location.provinceCity !== [] && location.address !== '') {
        database.insertOneToColection(database.iTravelDB.Locations, location)
            .then(() => {
                res.status(201).json({
                    message: 'Insert Success',
                    statusCode: 201
                });
            })
            .catch(() => {
                res.status(500).json({
                    message: 'Server error!',
                    statusCode: 500
                });
            });
    }
});

app.get('/tourguide/all-tourguide', (req, res) => {
    const tourguideFilter = {
        'permission': {
            $elemMatch: {
                $eq: config.USER_PERMISSION.TOURGUIDE
            }
        },
        'status': {
            $eq: config.USER_STATUS.ACTIVE
        }
    };

    const tourguideProjection = {
        _id: 1,
        username: 1,
        firstName: 1,
        lastName: 1
    };

    database.getCollectionDataByProjection(database.iTravelDB.Users, tourguideFilter, tourguideProjection)
        .then((data) => {
            res.status(201).json({
                statusCode: 200,
                data: data
            });
        })
        .catch((ex) => {
            console.log(ex);
            res.status(201).json({
                statusCode: 200,
                data: []
            });
        })
});

app.get('/tourguide/all-reviewer', (req, res) => {
    const reviewerFilter = {
        $or: [{
            'permission': {
                $elemMatch: {
                    $eq: config.USER_PERMISSION.TOURGUIDE
                }
            }
        }, {
            'permission': {
                $elemMatch: {
                    $eq: config.USER_PERMISSION.ADMIN
                }
            }
        }
        ],
        'status': {
            $eq: config.USER_STATUS.ACTIVE
        }
    };

    const reviewerProjection = {
        _id: 1,
        username: 1,
        firstName: 1,
        lastName: 1
    };

    database.getCollectionDataByProjection(database.iTravelDB.Users, reviewerFilter, reviewerProjection)
        .then((data) => {
            res.status(201).json({
                statusCode: 200,
                data: data
            });
        })
        .catch((ex) => {
            console.log(ex);
            res.status(201).json({
                statusCode: 200,
                data: []
            });
        })
});

/**
 * @name createTour
 * @param {Tour}
 * @author Thong
 */
app.post('/tourguide/create-tour', async (req, res) => {
    try {
        const newTour = new Tour(req.body);
        const userId = authentication.getTokenUserId(req.headers.authorization);
        newTour._id = new ObjectId();
        await newTour.save();
        res.status(201).json({
            message: 'Success!',
            statusCode: 201
        });
        const sendNotiResult = await notificationService.sendNotification(
            { content: `Có tour mới đang cần góp ý - ${newTour.tourName}` },
            userId
        );
        if(sendNotiResult.modifiedCount) {
            console.log('send notification successful')
        }
    } catch (error) {
        res.status(200).json({
            message: error.message,
            statusCode: 500
        });
    }
});

/**
 * @name updateTour
 * @param {Tour}
 * @author Thong
 */
app.patch('/tourguide/update-tour', async (req, res) => {
    try {
        const updatedTour = new Tour(req.body)
        const id = updatedTour._id
        delete updatedTour._id
        await Tour.updateOne({ _id: id }, updatedTour)
        res.status(200).json({
            message: 'Success!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Fail!'
        });
    }
});

/**
 * @name updateTourMemberCost
 * @param {tourId}
 * @param {memberItemId}
 * @author Thong
 */
app.patch('/tourguide/update-member-cost', async (req, res) => {
    try {
        const tourId = req.query.tourId;
        const memberItemId = req.query.memberItemId;
        await Tour.updateOne({
            '_id': tourId,
            'members._id': memberItemId
        }, { $set: { 'members.$.cost': 0 } });
        console.log('update-member-cost successful');
        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        console.log('update-member-cost failed');
        console.log(error.message);
        res.status(200).json({
            message: 'Fail'
        });
    }
});

/**
 * @name removeTour
 * @param {Tour}
 * @author Thong
 */
app.patch('/tourguide/remove-tour', async (req, res) => {
    try {
        const id = req.query.tourId;
        await Tour.updateOne({ _id: id }, { $set: { isActive: false } });
        res.status(200).json({
            message: 'Success!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Fail!'
        });
    }
});

app.patch('/tourguide/delete-own-tour', async (req, res) => {
    const deleteInfo = req.body;
    try {
        if (deleteInfo._id && deleteInfo.deleteBy)
            await Tour.updateOne({
                '_id': new ObjectId(deleteInfo._id),
                'createdBy': deleteInfo.deleteBy
            }, {
                    $set: {
                        'isActive': false
                    }
                }, (err, raw) => {
                    if (err || raw.n !== 1) {
                        res.status(200).json({
                            statusCode: 400
                        });
                    } else {
                        res.status(200).json({
                            statusCode: 201
                        });
                    }
                });
    } catch (err) {
        res.status(200).json({
            statusCode: 500
        });
    }
});

app.patch('/tourguide/update-tour-status', async (req, res) => {
    const updateInfo = req.body;
    const userId = authentication.getTokenUserId(req.headers.authorization);
    try {
        if (updateInfo._id && updateInfo.status) {
            await Tour.updateOne({
                '_id': new ObjectId(updateInfo._id)
            }, {
                    $set: {
                        'status': updateInfo.status
                    }
                }, (err, raw) => {
                    if (err || raw.n !== 1) {
                        res.status(200).json({
                            statusCode: 400
                        });
                    } else {
                        res.status(200).json({
                            statusCode: 201
                        });
                    }
                });
            const tour = await database.getOneWithProjection(
                database.iTravelDB.Tours,
                { _id: new ObjectId(updateInfo._id) },
                { tourName: 1 }
            );
            const sendNotiResult = await notificationService.sendNotification(
                { content: `Bạn có muốn tham gia tour mới ${tour.tourName}` },
                userId
            );
            if(sendNotiResult.modifiedCount) {
                console.log('send notification successful')
            }
        } else {
            res.status(200).json({
                statusCode: 404
            });
        }
    } catch (err) {
        res.status(200).json({
            statusCode: 500
        });
    }
})
// Routing - END