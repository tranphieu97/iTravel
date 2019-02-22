// Include js file
const database = require('../database.js');
const config = require('../../_config.js');
const authetication = require('../authentication.js');

// Include library
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;

// Get app instance from index
const app = require('../../index');

// Routing - START
/**
 * @name USER - GET User's post
 * @author phieu-th
 * @description
 * @returns list user's post
 */
app.get('/user/posts', async (req, res) => {
    const userId = req.param('userId');
    let token = req.headers.authorization;

    if (token !== undefined) {
        token = token.split(' ')[1];
    }

    if (token === undefined || token === null) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        const tokenData = jwt.verify(token, config.SECRET_KEY);

        if (tokenData._id === undefined || tokenData._id !== userId) {
            res.status(401).json({
                message: 'Unauthorized'
            });
        } else {
            const userPostsFilter = {
                authorId: {
                    $eq: userId
                }
            }
            const projectionProperties = {
                _id: 1,
                title: 1,
                categories: 1,
                status: 1,
                createdTime: 1,
                approvedTime: 1
            }

            database.getProjectCollectionDataByFilter(database.iTravelDB.Posts, userPostsFilter, projectionProperties)
                .then((data) => {
                    // Clean data to show
                    data.forEach(post => {
                        post.categories = post.categories.map(x => x.name);
                    });

                    res.status(200).json({
                        message: 'Get User Post Success',
                        data: data
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
});

/**
 * @name USER - GET User's profile
 * @author phieu-th
 * @description
 * @returns 
 */
app.get('/user/profile', async (req, res) => {
    const username = req.param('username');
    let token = req.headers.authorization;

    if (token !== undefined) {
        token = token.split(' ')[1];
    }

    if (token === undefined || token === null) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        const tokenData = jwt.verify(token, config.SECRET_KEY);

        if (tokenData.username === undefined || tokenData.username !== username) {
            res.status(401).json({
                message: 'Unauthorized'
            });
        } else {
            const userFilter = {
                username: {
                    $eq: username
                }
            }
            database.getOneFromCollection(database.iTravelDB.Users, userFilter)
                .then((userInfo) => {
                    if (userInfo === null) {
                        res.status(404).json({
                            message: 'Not found Username'
                        });
                    } else {
                        const returnedUserData = {
                            _id: userInfo._id,
                            username: userInfo.username,
                            email: userInfo.email,
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            birthDay: userInfo.birthDay,
                            level: userInfo.level,
                            hometown: userInfo.hometown,
                            point: userInfo.point,
                            permission: userInfo.permission,
                            avatar: userInfo.avatar
                        }
                        res.status(200).json({
                            message: 'Success',
                            data: returnedUserData
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
});

/**
 * @name USER - POST Token Login
 * @author phieu-th
 * @description re-login by token stored in localstorage
 * @returns User's base info and new token
 */
app.post('/user/token-login', async (req, res) => {
    let token = req.headers.authorization;

    if (token !== undefined) {
        token = token.split(' ')[1];
    }
    if (token === undefined || token === null) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        const tokenData = jwt.verify(token, config.SECRET_KEY);

        if (tokenData.username === undefined || tokenData.exp < Date.now().valueOf / 1000) {
            res.status(401).json({
                message: 'Unauthorized'
            });
        } else {
            const filterUser = {
                username: {
                    $eq: tokenData.username
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
                        let isAdmin = false;

                        if (userInfo.permission === 'Admin') {
                            isAdmin = true;
                        }

                        const userData = {
                            _id: userInfo._id,
                            username: userInfo.username,
                            isAdmin: isAdmin
                        }

                        const data = {
                            _id: userInfo._id,
                            username: userInfo.username,
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            avatar: userInfo.avatar,
                            isAdmin: isAdmin
                        }
                        authetication.insertUserSignInLog(userInfo.username);
                        jwt.sign(userData, config.SECRET_KEY, { expiresIn: '23h' }, (err, jwtToken) => {
                            res.status(201).json({
                                message: 'Login success!',
                                token: jwtToken,
                                data: data
                            });
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
    }
});
// Routing - END