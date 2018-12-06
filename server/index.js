
// Include js file
const config = require('./_config');
const database = require('./app/database.js');
const authetication = require('./app/authentication.js');
const User = require('./model/user.model').User;

// Include library
const path = require('path');
const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
var Q = require('q');

const app = express();

// some extention of image that allow to save on server
const MINE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
};
/**
 * @author Thong
 * @description config multer for store image on server
 */
const storage = multer.diskStorage({
    destination: (req, file, cback) => {
        // check file type is valid
        const isValid = MINE_TYPE_MAP[file.mimetype];
        let err = new Error('Invalid mine type');
        if (isValid) {
            err = null;
        }
        cback(err, 'server/images');
    },
    filename: (req, file, cback) => {
        // remove space and replace by '-'
        const name = file.originalname.toLowerCase().trim().split(' ').join('-');
        const ext = MINE_TYPE_MAP[file.mimetype];
        cback(null, name + '-' + Date.now() + '.' + ext);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// allow outside connect to /images and map to server/images folder on server
app.use('/images', express.static(path.join("server/images")))

app.listen(config.APP_PORT, () => {
    console.log('Server is running at http://localhost:' + config.APP_PORT + '/');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type,Accept, X-Auth-Token, App-Auth, X-XSRF-TOKEN, Authorization');

    // check token
    const url = req.url;
    const token = req.headers.authorization;
    if (url.indexOf('/api/') === -1 && url.indexOf('/auth/') === -1 && (token === null || token === undefined)) {
        res.status(401).json({
            message: 'Unauthorize'
        });
    }
    next();
});

/** Routing - START */
app.get('/', (req, res) => {
    res.send('http://localhost:7979/');
});

app.get('/api/provinces', (req, res) => {
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

app.get('/api/province-city', (req, res) => {
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

app.get('/api/menu', (req, res) => {
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

app.get('/api/posts', (req, res) => {
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
app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    // pass a post to insertOneToColection(), function will upload to server automaticaly
    database.insertOneToColection(database.iTravelDB.Posts, post)
        .then(() => {
            res.status(201).json({
                message: 'Upload post successfuly'
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'Upload post fail!'
            });
        });
});

app.post('/upload-image', multer({ storage: storage }).single('image'), (req, res, next) => {
    const imageUrl = req.protocol + '://' // http://
        + req.get("host") // http://localhost:7979
        + "/images/" // http://localhost:7979/images/
        + req.file.filename; // http://localhost:7979/images/abc.jpg
    // if (req.file !== undefined || req.file) {
    res.status(201).json({
        message: 'Upload image successfuly',
        imageUrl: imageUrl
    });
    // }
});

/**
 * @name GET-tags
 * @author Thong
 * @param request
 * @description receive request from serverService
 * then call to fetch all tags from mongodb, send back response with message and data if successful
 */
app.get('/api/tags', (req, res, next) => {
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
 * @name GET-locations
 * @author Thong
 * @param request
 * @description receive request from serverService
 * then call to fetch all locations from mongodb, send back response with message and data if successful
 */
app.get('/api/locations', (req, res, next) => {
    database.getCollectionData(database.iTravelDB.Locations).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load ' + database.iTravelDB.Locations + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.Locations + 'fail!'
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
app.get('/api/post-categories', (req, res, next) => {
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

app.post('/api/create-feedback', (req, res) => {

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

app.post('/api/create-search-history', (req, res) => {

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

app.get('/api/report/searchkeyword', (req, res) => {
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
                    res.status(200).json({
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
                    res.status(200).json({
                        message: 'Invalid Username',
                        data: false
                    });
                } else {
                    authetication.comparePassword(password, userInfo.password).then((isMatch) => {
                        if (!isMatch) {
                            res.status(200).json({
                                message: 'Incorrect password',
                                data: false
                            });
                        } else {
                            const isAdmin = false;

                            if (userInfo.permission === 'Admin') {
                                isAdmin = true;
                            }

                            const userData = {
                                _id: userInfo._id,
                                username: userInfo.username,
                                isAdmin: isAdmin
                            }

                            
                            
                            const data = {
                                username: userInfo.username,
                                firstName: userInfo.firstName,
                                lastName: userInfo.lastName,
                                avatar: userInfo.avatar,
                                isAdmin: isAdmin
                            }

                            jwt.sign(userData, config.SECRET_KEY, { expiresIn: '23h' }, (err, jwtToken) => {
                                res.status(201).json({
                                    message: 'Login success!',
                                    token: jwtToken,
                                    data: data
                                });
                            });
                        }
                    });
                }
            });
    }
})
/** Routing - END */
