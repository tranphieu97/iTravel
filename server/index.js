// Include js file
const config = require('./_config');
const database = require('./app/database.js');
const authetication = require('./app/authentication.js');
const User = require('./model/user.model').User;
const postService = require('./app/post-service');

// Include library
const path = require('path');
const express = require('express');
var ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
var Q = require('q');
var cors = require('cors')({ origin: true });

// Create and export server app by express
const app = module.exports = express();

// Server's base config
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// allow outside connect to /images and map to server/images folder on server
app.use('/api/images', express.static(path.join(__dirname, "images")));
app.use('/', express.static(path.join(__dirname, "angular")));
app.use('/home', express.static(path.join(__dirname, "angular")))

app.listen(config.APP_PORT, () => {
    console.log('Server is running on port ' + config.APP_PORT + '/');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token, App-Auth, X-XSRF-TOKEN, Authorization');

    // check token
    const url = req.url;
    let token = req.headers.authorization;

    if (token !== undefined) {
        token = token.split(' ')[1];
    }

    if (url.indexOf('/api/') === -1 && url.indexOf('/auth/') === -1 && (token === null || token === undefined)) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }

    next();
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

// Use routings in others controller
require('./app/routing/api-routing.js');
require('./app/routing/authentication-routing');
require('./app/routing/manager-routing.js');
require('./app/routing/user-routing.js');
require('./app/routing/upload-routing.js');

/** Routing - START */
/** Routing - END */
