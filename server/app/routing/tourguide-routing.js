// Include js file
const database = require('../database.js');
const config = require('../../_config.js');

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
})
// Routing - END