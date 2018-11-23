
// Include js file
const config = require('./_config');
const database = require('./app/database.js');

// Include library
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var Q = require('q');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.listen(config.APP_PORT, () => {
    console.log('Server is running at http://localhost:' + config.APP_PORT + '/');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/** Routing - START */
app.get('/', (req, res) => {
    res.send('http://localhost:7979/');
});

app.get('/db/provinces', (req, res) => {
    database.getCollectionData(database.iTravelDB.pro).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load ' + database.iTravelDB.Provinces + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.Provinces + 'fail!'
            })
        }
    });
});

app.get('/db/province-city', (req, res) => {
    database.getCollectionData(database.iTravelDB.ProvinceCity).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load ' + database.iTravelDB.ProvinceCity + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.ProvinceCity + 'fail!'
            })
        }
    });
});

app.get('/db/menu', (req, res) => {
    // const COLECTION_NAME = 'Menu';
    database.getCollectionData(database.iTravelDB.Menu).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load ' + database.iTravelDB.Menu + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.Menu + 'fail!'
            })
        }
    });
});

app.get('/db/posts', (req, res) => {
    // const COLECTION_NAME = 'Posts';
    database.getCollectionData(database.iTravelDB.Posts).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load ' + database.iTravelDB.Posts + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.Posts + 'fail!'
            })
        }
    });
});

/**
 * @name POST-new-post
 * @author Thong
 * @param request
 * @description receive request from serverService, include a postData in requestBody
 * then insert that post to mongodb, send back response with message
 */
app.post('/db/posts', (req, res, next) => {
    let post = req.body;
    // pass a post to insertOneToColection(), function will upload to server automaticaly
    database.insertOneToColection(database.iTravelDB.Posts, post)
        .then(() => {
            res.status(201).json({
                message: 'Insert post successfuly'
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'Insert post fail!'
            });
        })
});

/**
 * @name GET-tags
 * @author Thong
 * @param request
 * @description receive request from serverService
 * then call to fetch all tags from mongodb, send back response with message and data if successful
 */
app.get('/db/tags', (req, res, next) => {
    database.getCollectionData(database.iTravelDB.Tags).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load ' + database.iTravelDB.Tags + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.Tags + 'fail!'
            })
        }
    });
});

/**
 * @name GET-post-categories
 * @author Thong
 * @param request
 * @description receive request from serverService
 * then call to fetch all tags from mongodb, send back response with message and data if successful
 */
app.get('/db/post-categories', (req, res, next) => {
    database.getCollectionData(database.iTravelDB.PostCategories).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load ' + database.iTravelDB.PostCategories + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.PostCategories + 'fail!'
            })
        }
    });
});

app.post('/create-feedback', (req, res) => {

    const feedback = req.body;

    if (feedback.name.trim() === '' || feedback.from.trim() === ''
        || feedback.content.trim() === '' || feedback.creationDatetime == null) {
        res.status(400).json({
            message: 'Invalid data!'
        });
    } else {
        database.insertOneToColection(database.iTravelDB.Feedback, feedback)
            .then(() => {
                res.status(200).json({
                    message: 'Success!'
                });
            }).catch(() => {
                res.status(500).json({
                    message: 'Fail!'
                });
            })
    }
});

app.post('/create-search-history', (req, res) => {

    const searchHistory = req.body;

    if (searchHistory === undefined || searchHistory.keyword === undefined
        || searchHistory.keyword.trim() === '' || searchHistory.creationTime == null) {
        res.status(400).json({
            message: 'Invalid data!'
        });
    } else {
        database.insertOneToColection(database.iTravelDB.SearchHistory, searchHistory)
            .then(() => {
                res.status(200).json({
                    message: 'Success!'
                });
            }).catch(() => {
                res.status(500).json({
                    message: 'Fail!'
                });
            })
    }
});
/** Routing - END */
