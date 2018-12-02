
// Include js file
const config = require('./_config');
const database = require('./app/database.js');
const authetication = require('./app/authentication.js');
const User = require('./model/user.model').User;

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

app.use(bodyParser.json());

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
    // const COLECTION_NAME = 'Provinces';
    database.getCollectionData(database.iTravelDB.Provinces).then((data) => {
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
        const searchDocument = {
            keyword: searchHistory.keyword,
            creationTime: new Date(searchHistory.creationTime),
            searchBy: searchHistory.searchBy
        }

        database.insertOneToColection(database.iTravelDB.SearchHistory, searchDocument)
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

app.get('/report/searchkeyword', (req, res) => {
    startDate = new Date(req.param('startDate'));
    endDate = new Date(req.param('endDate'));

    if (startDate < endDate) {
        const dateRangeFilter = {
            creationTime: {
                $gte: startDate,
                $lte: endDate
            }
        }
        database.getCollectionFilterData(database.iTravelDB.SearchHistory, dateRangeFilter)
            .then((collectionData) => {
                let sortedData = []
                collectionData.forEach(record => {
                    sortedData.push({
                        keyword: record.keyword,
                        count: 1
                    });
                });

                res.status(200).json({
                    message: 'Got search Data',
                    data: sortedData
                })
            });
    } else {
        res.status(400).json({
            message: 'Invalid Data',
            data: []
        });
    }
})

app.get('/auth/exist-username', (req, res) => {

    username = req.param('username');

    authetication.isExistUsername(username.trim())
        .then((result) => {
            res.status(200).json({
                message: 'Check exist username is successed',
                data: result
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'Check exist username is fail',
                data: false
            });
        });
})

app.post('/auth/register-user', async (req, res) => {

    // Get POST REQUEST'S BODY DATA
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const confirmPassword = req.body.confirmPassword;
    const acceptPolicies = req.body.acceptPolicies;

    // Validate Data
    if (acceptPolicies && username !== '' && password !== '' && firstName !== '' && password === confirmPassword) {
        authetication.isExistUsername(username)
            .then((isExist) => {
                if (!isExist) {

                    // Hash password and creat user
                    authetication.hashPassword(password).then((hashPassword) => {
                        var registerUser = new User(username, hashPassword, '', firstName, lastName,
                            null, 'Newbie', '', 0, 'Member', 'Active', '', false);

                        database.insertOneToColection(database.iTravelDB.Users, registerUser)
                            .then(() => {
                                // Check creation result
                                authetication.isExistUsername(username)
                                    .then((isExist) => {
                                        if (isExist) {
                                            res.status(201).json({
                                                message: 'Register is success',
                                                data: true
                                            });
                                        } else {
                                            res.status(500).json({
                                                message: 'Register User is fail',
                                                data: false
                                            });
                                        }
                                    })
                            });
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    res.status(409).json({
                        message: 'Register new User Fail, Username is Exist',
                        data: false
                    });
                }
            });
    } else {
        res.status(400).json({
            message: 'Register new User Fail, Data invalid',
            data: false
        });
    }
});

app.post('/auth/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const usernameRegex = new RegExp('^(?=.*[a-z])[a-z0-9._@-]{1,30}$');
    const passwordRegex = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{1,30}$');

    if (username === '' || username.length < 6 || username.length > 30
        || password === '' || password.length < 8
        || !usernameRegex.test(username) || !passwordRegex.test(password)) {
        res.status(400).json({
            message: 'Invalid Account',
            data: false
        });
    } else {
        const filterUser = {
            username: {
                $eq: username
            }
        }

        database.getOneFromCollection(database.iTravelDB.Users, filterUser)
            .then((userInfo) => {
                if (userInfo === null || userInfo === undefined) {
                    res.status(422).json({
                        message: 'Invalid username',
                        data: false
                    });
                } else {
                    authetication.comparePassword(password, userInfo.password).then((isMatch) => {
                        if (!isMatch) {
                            res.status(422).json({
                                message: 'Incorrect password',
                                data: false
                            });
                        } else {
                            res.status(200).json({
                                message: 'Login success!',
                                data: {
                                    username: userInfo.username,
                                    avatar: userInfo.avatar,
                                    firstName: userInfo.firstName,
                                    lastName: userInfo.lastName
                                }
                            });
                        }
                    });
                }
            });
    }
})
/** Routing - END */
