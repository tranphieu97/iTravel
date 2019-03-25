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
 * @name MANAGER - GET Posts
 * @author phieu-th
 * @description
 * @returns All posts in Database
 */
app.get('/manager/posts', async (req, res) => {
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

        if (tokenData.username === undefined || !tokenData.isAdmin) {
            res.status(401).json({
                message: 'Unauthorized'
            });
        } else {
            const userFilter = {
                username: {
                    $eq: tokenData.username
                },
                permission: {
                    $eq: config.USER_PERMISSION.Admin
                }
            }
            database.getOneFromCollection(database.iTravelDB.Users, userFilter)
                .then((userInfo) => {
                    if (userInfo === null) {
                        res.status(401).json({
                            message: 'Unauthorized'
                        });
                    } else {
                        database.getCollectionData(database.iTravelDB.Posts)
                            .then((listPost) => {
                                var postsManagementData = []

                                listPost.forEach((post) => {
                                    postsManagementData.push({
                                        _id: post._id,
                                        title: post.title,
                                        authorId: post.authorId,
                                        createdTime: post.createdTime,
                                        status: post.status,
                                        categories: post.categories.map(x => x.name)
                                    })
                                });

                                res.status(200).json({
                                    message: 'Success',
                                    data: postsManagementData
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    message: 'Fail'
                                });
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        message: 'Fail'
                    });
                });
        }
    }
});

/**
 * @name MANAGER - PATCH Approve a post
 * @author phieu-th
 * @description Set a post's status to approved
 * @returns
 */
app.patch('/manager/approve-post', async (req, res) => {
    const postId = req.body.postId;
    const status = req.body.status;
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

        authetication.isAdminUser(tokenData.username)
            .then((result) => {
                if (!result || status !== config.POST_STATUS.APPROVED) {
                    res.status(403).json({
                        message: 'Forbidden'
                    });
                } else {
                    // Check post status
                    const postFilter = {
                        "_id": {
                            $eq: new ObjectId(postId)
                        }
                    };

                    // Get post by Id, check exist and havent been approved
                    database.getOneFromCollection(database.iTravelDB.Posts, postFilter)
                        .then((result) => {
                            if (result) {
                                if (result.status === config.POST_STATUS.APPROVED) {
                                    res.status(200).json({
                                        message: 'It was approved before'
                                    });
                                } else {
                                    // Update status to approved 
                                    const idFilter = {
                                        "_id": new ObjectId(postId)
                                    };

                                    const fieldChange = {
                                        "status": status,
                                        "approvedTime": new Date()
                                    };
                                    database.updateDocumentByFilter(database.iTravelDB.Posts, idFilter, fieldChange)
                                        .then((updateResult) => {
                                            // matchedCount is defult result will be returned by mongodb
                                            if (updateResult.matchedCount === 1) {
                                                res.status(201).json({
                                                    message: 'Approved Success'
                                                });
                                            } else {
                                                res.status(200).json({
                                                    message: 'Not found post'
                                                });
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                }
                            } else {
                                res.status(200).json({
                                    message: 'Not found post'
                                });
                            }
                        })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

/**
 * @name MANAGER - PATCH Deny a post
 * @author phieu-th
 * @description Set a post's status to deny
 * @returns
 */
app.patch('/manager/deny-post', async (req, res) => {
    const postId = req.body.postId;
    const status = req.body.status;
    const reason = req.body.reason;
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

        authetication.isAdminUser(tokenData.username)
            .then((result) => {
                if (!result || status !== config.POST_STATUS.DENY) {
                    res.status(403).json({
                        message: 'Forbidden'
                    });
                } else {
                    // Check post status
                    const postFilter = {
                        "_id": {
                            $eq: new ObjectId(postId)
                        }
                    };

                    // Get post by Id, check exist and havent been approved
                    database.getOneFromCollection(database.iTravelDB.Posts, postFilter)
                        .then((result) => {
                            if (result) {
                                if (result.status === config.POST_STATUS.DENY) {
                                    res.status(200).json({
                                        message: 'It was denied before'
                                    });
                                } else {
                                    // Update status to approved 
                                    const idFilter = {
                                        "_id": new ObjectId(postId)
                                    };

                                    const fieldChange = {
                                        "status": status
                                    };
                                    database.updateDocumentByFilter(database.iTravelDB.Posts, idFilter, fieldChange)
                                        .then((updateResult) => {
                                            // matchedCount is defult result will be returned by mongodb
                                            if (updateResult.matchedCount === 1) {
                                                res.status(201).json({
                                                    message: 'Denied Success'
                                                });
                                            } else {
                                                res.status(200).json({
                                                    message: 'Not found post'
                                                });
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                }
                            } else {
                                res.status(200).json({
                                    message: 'Not found post'
                                });
                            }
                        })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
});
// Routing - END