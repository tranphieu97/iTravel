// Include js file
const database = require('../database.js');
const config = require('../../_config.js');
var ObjectId = require('mongodb').ObjectId;

// Import models file
const { Tour } = require('../../model/mongoose/models')

// Get app instance from index
const app = require('../../index');

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
        newTour._id = new ObjectId();
        await newTour.save();
        res.status(201).json({
            message: 'Success!',
            statusCode: 201
        });
    } catch (error) {
        res.status(200).json({
            message: 'Fail!',
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
 * @name removeTour
 * @param {Tour}
 * @author Thong
 */
app.patch('/tourguide/remove-tour', async (req, res) => {
    try {
        const id = req.param('tourId')
        await Tour.updateOne({ _id: id }, { $set: { isActive: false } })
        res.status(200).json({
            message: 'Success!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Fail!'
        });
    }
});
// Routing - END