// Include js file
const database = require('../database.js');
const config = require('../../_config.js');
const authentication = require('../authentication.js');

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
    const filter = {
        _id: {
            $ne: null
        }
    };

    const projectionPost = {
        _id: 1,
        title: 1,
        authorId: 1,
        createdTime: 1,
        status: 1,
        categories: 1
    };

    database.getCollectionDataByProjection(database.iTravelDB.Posts, filter, projectionPost)
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
                message: 'Fail',
                data: []
            });
        });
});

/**
 * @name MANAGER - GET All Users Permission
 * @author phieu-th
 * @description
 * @returns All Username in database and their permision
 */
app.get('/manager/users-permission', async (req, res) => {
    // Filter for get all data in collection
    const filter = {
        _id: {
            $ne: null
        }
    }

    const projectionInfo = {
        _id: 1,
        username: 1,
        email: 1, firstName: 1,
        lastName: 1,
        permission: 1,
        avatar: 1
    };

    database.getCollectionDataByProjection(database.iTravelDB.Users, filter, projectionInfo)
        .then((listPost) => {
            res.status(200).json({
                message: 'Success',
                data: listPost
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Fail',
                data: []
            });
        });
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

    if (status !== config.POST_STATUS.APPROVED) {
        res.status(403).json({
            message: 'Forbidden'
        });
    } else {
        // Check post status
        const postFilter = {
            '_id': {
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
                            '_id': new ObjectId(postId)
                        };

                        const fieldChange = {
                            'status': status,
                            'approvedTime': new Date()
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

    if (status !== config.POST_STATUS.DENY) {
        res.status(403).json({
            message: 'Forbidden'
        });
    } else {
        // Check post status
        const postFilter = {
            '_id': {
                $eq: new ObjectId(postId)
            }
        };

        // Get post by Id, check exist and havent been denied
        database.getOneFromCollection(database.iTravelDB.Posts, postFilter)
            .then((result) => {
                if (result) {
                    if (result.status === config.POST_STATUS.DENY) {
                        res.status(200).json({
                            message: 'It was denied before'
                        });
                    } else {
                        // Update status to deny 
                        const idFilter = {
                            '_id': new ObjectId(postId)
                        };

                        const fieldChange = {
                            'status': status
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
                            });
                    }
                } else {
                    res.status(200).json({
                        message: 'Not found post'
                    });
                }
            });
    }
});

/**
 * Manager set permisson for user
 * @name PATCH Set Permission
 * @author phieu-th
 * @description
 * @returns
 */
app.patch('/manager/set-user-permission', async (req, res) => {
    try {
        let listPermission = req.body.listPermission;
        const userId = req.body.userId;
        const changedBy = req.body.changedBy;
        const confirmPassword = req.body.confirmPassword;

        // Convert object to list
        const systemPermissions = Object.values(config.USER_PERMISSION);

        // Validate list permission
        if (listPermission !== undefined && userId !== undefined) {
            listPermission.forEach(permission => {
                if (!systemPermissions.includes(permission.permissionName)) {
                    res.status(404).json({
                        message: 'Incorrect permission',
                        MessageCode: 'MUP_E01'
                    });
                }
            });

            authentication.isValidUserIdPassword(changedBy, confirmPassword)
                .then(result => {
                    if (result) {
                        listPermission = listPermission.filter(x => x.isChecked === true).map(x => x.permissionName);

                        // Uncheck all
                        if (listPermission.length === 0) {
                            listPermission.push(config.USER_PERMISSION.MEMBER);
                        }

                        const userFiler = {
                            '_id': {
                                $eq: new ObjectId(userId)
                            }
                        };

                        database.getOneFromCollection(database.iTravelDB.Users, userFiler)
                            .then(userInfo => {
                                if (userInfo !== undefined) {

                                    const updatePermission = {
                                        'permission': listPermission
                                    };

                                    database.updateDocumentByFilter(database.iTravelDB.Users, userFiler, updatePermission)
                                        .then(result => {
                                            res.status(200).json({
                                                message: 'Updated Success',
                                                MessageCode: 'MUP_M01'
                                            });
                                        })
                                        .catch(err => {
                                            res.status(200).json({
                                                message: 'Updated Fail',
                                                MessageCode: 'MUP_E02'
                                            });
                                        });
                                } else {
                                    res.status(404).json({
                                        message: 'Incorrect userId',
                                        MessageCode: 'MUP_E03'
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(200).json({
                                    message: 'Updated Fail',
                                    MessageCode: 'MUP_E02'
                                });
                            });
                    } else {
                        res.status(200).json({
                            message: 'Incorrect password',
                            MessageCode: 'MUP_E04'
                        });
                    }
                });
        } else {
            res.status(404).json({
                message: 'Incorrect body data',
                MessageCode: 'MUP_E05'
            });
        }
    }
    catch (err) {
        res.status(200).json({
            message: 'System error',
            MessageCode: 'MUP_E06'
        });
    };
});
// Routing - END