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
// Routing - END