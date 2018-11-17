
// Include js file
const config = require('./_config');
const database = require('./app/database.js');

// Include library
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var Q = require('q');

const app = express();

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

app.get('/', function (req, res) {
    res.send('http://localhost:7979/');
});

app.get('/db/provinces', function (req, res) {
    database.GetCollection('Provinces')
        .then(function (colection) {
            var result = colection.find().toArray(function (err, result) {
                if (err) {
                    console.log('Error find data from collection Provinces');
                    res.send(null);
                }
                res.send(result);
            });
        });
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

app.get('/db/posts', (req, res, next) => {
    // call to database
    database.GetCollection('Posts')
        .then((collection) => {// after got data from database
            collection.find().toArray((toArrayErr, succeedResult) => {
                if (toArrayErr) {
                    // if there are errors when convert to array
                    console.log('Error get data from collection Posts');
                    res.json({
                        message: 'Fail to get posts from collection Posts'
                    });
                }
                res.status(200).json({
                    message: 'you received posts from the server here',
                    posts: succeedResult
                });
            });
        });
});

app.get('/db/menu', function (req, res) {
    database.GetCollection('Menu')
        .then(function (colection) {
            var menu = colection.find().toArray(function (err, result) {
                if (err) {
                    console.log('Error find data from collection Menu');
                    res.send(null);
                }
                res.send(result);
            });
        });
});

// app.get('/db/posts', function (req, res) {
//     database.GetCollection('Mokup_Posts')
//         .then(function (colection) {
//             var posts = colection.find().toArray(function (err, result) {
//                 res.send(result);
//             });
//         });
// });

