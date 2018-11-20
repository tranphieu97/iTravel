
// Include js file
const config = require('./_config');
const database = require('./app/database.js');

// Include library
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var Q = require('q');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())

app.listen(config.APP_PORT, () => {
    console.log('Server is running at http://localhost:' + config.APP_PORT + '/');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/** Routing - START */
app.get('/',(req, res) => {
    res.send('http://localhost:7979/');
});

app.get('/db/provinces', (req, res) => {
    const COLECTION_NAME = 'Provinces';
    database.getCollectionData(COLECTION_NAME).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load '+ COLECTION_NAME + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + COLECTION_NAME + 'fail!'
            })
        }
    });
});

app.get('/db/menu', (req, res) => {
    const COLECTION_NAME = 'Menu';
    database.getCollectionData(COLECTION_NAME).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load '+ COLECTION_NAME + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + COLECTION_NAME + 'fail!'
            })
        }
    });
});

app.get('/db/posts', (req, res) => {
    const COLECTION_NAME = 'Posts';
    database.getCollectionData(COLECTION_NAME).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load '+ COLECTION_NAME + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + COLECTION_NAME + 'fail!'
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

app.post('/db/posts', (req, res, next) => {
    let post = req.body;
    database.GetCollection('Posts')
        .then((collection) => {
            // after get collection, insert newPost to posts collection
            collection.insertOne(post).then(() => {
                res.status(201).json({
                    message: 'A new post added to Posts collection'
                });
            });
        });
});

// app.get('/db/posts', (req, res, next) => {
//     // call to database
//     database.GetCollection('Posts')
//         .then((collection) => {// after got data from database
//             collection.find().toArray((toArrayErr, succeedResult) => {
//                 if (toArrayErr) {
//                     // if there are errors when convert to array
//                     console.log('Error get data from collection Posts');
//                     res.json({
//                         message: 'Fail to get posts from collection Posts'
//                     });
//                 }
//                 res.status(200).json({
//                     message: 'you received posts from the server here',
//                     posts: succeedResult
//                 });
//             });
//         });
// });

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
