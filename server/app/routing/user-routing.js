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
 * @name USER - GET User's post
 * @author phieu-th
 * @description
 * @returns list user's post
 */
app.get('/user/posts', async (req, res) => {
    const userId = req.param('userId');

    const userPostsFilter = {
        authorId: {
            $eq: userId
        }
    };
    const projectionProperties = {
        _id: 1,
        title: 1,
        categories: 1,
        status: 1,
        createdTime: 1,
        approvedTime: 1
    };

    database.getCollectionDataByProjection(database.iTravelDB.Posts, userPostsFilter, projectionProperties)
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
        });
});

/**
 * @name USER - GET User's profile
 * @author phieu-th
 * @description
 * @returns 
 */
app.get('/user/profile', async (req, res) => {
    const username = req.param('username');

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

                        if (userInfo.permission.includes(config.USER_PERMISSION.ADMIN)) {
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
                        authentication.insertUserSignInLog(userInfo.username);
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

/**
 * @name PUT-update-post
 * @author Thong
 * @param request
 * @description receive request from serverService, include a postData need to update in requestBody
 */
app.put('/user/update-post', (req, res) => {
    // get updated-post from request
    const post = req.body;
    // go to validate on server side
    if (// validate list postContents not empty
        post.postContents.length <= 0
        // validate post title
        || post.title.length <= 0 || post.title.length > 200
        // validate cover
        || post.cover.length <= 0
        // validate place
        || post.location.locationName.length <= 0 || post.location.locationName.length > 200
        // validate provinceCity
        || post.location.provinceCity.length <= 0
        // validate address
        || post.location.address.length > 300
        // validate category
        || post.categories.length <= 0
        // validate description
        || post.description.length <= 0 || post.description.length > 500
    ) {
        console.log('Validate post fail');
        res.status(400).json({
            message: 'Update post fail!'
        });
    } else {
        // fix some properties to default value
        post._id = new ObjectId(post._id);
        // fix createdTime from string to Date type
        post.createdTime = new Date(post.createdTime);
        post.approvedTime = null;
        // fix all post tags._id = ObjectId()
        for (const tag of post.tags) {
            // if not has id yet
            if (tag._id.length !== 24) {
                tag._id = new ObjectId();
            } else {
                // has id already, create ObjectId from the old one
                tag._id = new ObjectId(tag._id);
            }
        }
        // fix id of all new post content, _id = ObjectId()
        for (const postContent of post.postContents) {
            // if not has id yet, create new one
            if (postContent._id.length !== 24) {
                postContent._id = new ObjectId();
            } else {
                // has id already, create ObjectId from the old one
                postContent._id = new ObjectId(postContent._id);
            }
        }
        // fix all post categories._id =  ObjectId()
        for (const category of post.categories) {
            category._id = new ObjectId(category._id);
        }
        post.status = 'PENDING';
        post.location._id = new ObjectId(post.location._id);
        // fix all complete

        // create filter from id
        const filterObj = { _id: new ObjectId(post._id) }
        // pass the post to replaceDocumentById(), function will replay by filter
        database.replaceDocumentById(database.iTravelDB.Posts, filterObj, post)
            .then(() => {
                console.log('Update post to mongodb successfully');
                res.status(200).json({
                    message: 'Update post successfully',
                    postId: post._id
                });
            })
            .catch(() => {
                console.log('Update post to mongodb fail');
                res.status(200).json({
                    message: 'Update post fail!'
                });
            });
    }
});

/**
 * @name PATCH-new-comment
 * @author Thong
 * @param {string} postId
 * @param {Comment[]} listComment use for update 
 */
app.patch('/user/send-comment', (req, res) => {
    // pass validate token
    // validate postId param
    if (req.param('postId') === null || req.param('postId') === undefined || req.param('postId').length !== 24) {
        res.status(200).json({
            message: 'Invalid post Id'
        })
    }
    else {
        // validate list comments use to update
        if (req.body.length <= 0) {
            res.status(200).json({
                message: 'Invalid list comments'
            })
        } else {
            // validate the all comment
            for (const eachComment of req.body) {
                // validate some basic length
                if (eachComment.userId.length !== 24
                    || eachComment.content.length <= 0
                    || eachComment.content.length > 200) {
                    console.log('validate comments fail');
                    res.status(200).json({
                        message: 'Invalid list comments'
                    })
                    return;
                }
                // validate id of user like and dislike
                for (const userId of eachComment.userLiked) {
                    if (!userId || userId.length !== 24) {
                        console.log('Invalid id of user liked');
                        res.status(200).json({
                            message: 'Invalid list comments'
                        })
                        return;
                    }
                }
                for (const userId of eachComment.userDisliked) {
                    if (!userId || userId.length !== 24) {
                        console.log('Invalid id of user disliked');
                        res.status(200).json({
                            message: 'Invalid list comments'
                        })
                        return;
                    }
                }
            }
            // pass the validate => go to update
            // obj store all listComment for update
            const newListComment = {
                "comments": req.body
            };

            // in request has post Id, create query object from that
            const queryObj = { _id: new ObjectId(req.param('postId')) }

            database.updateDocumentByFilter(database.iTravelDB.Posts, queryObj, newListComment)
                .then((updateResult) => {
                    // matchedCount is default result will be returned by mongodb
                    if (updateResult.matchedCount === 1) {
                        res.status(201).json({
                            message: 'Send Comment Success'
                        });
                    } else {
                        res.status(200).json({
                            message: 'Not found post'
                        });
                    }
                })
                .catch((err) => {
                    console.log('Send Comment Has Err');
                })
        }
    }
});

/**
 * @name PATCH-new-rating
 * @author Thong
 * @param {string} postId
 * @param {PostRating[]} listRating use for update 
 */
app.patch('/user/send-rating', (req, res) => {
    // validate list rating use to update
    if (req.body.length <= 0) {
        res.status(200).json({
            message: 'Invalid list rating'
        })
    } else {
        // validate the all rating
        for (const eachRating of req.body) {
            if (eachRating.userId.length !== 24
                || eachRating.ratingNumber <= 0
                || eachRating.ratingNumber > 5) {
                console.log('validate rating fail');
                res.status(200).json({
                    message: 'Invalid list rating'
                })
                return;
            }
        }
        // pass the validate => go to update
        // obj store all listRating for update
        const newListRating = {
            "rating": req.body
        };

        // in request has post Id, create query object from that
        const queryObj = { _id: new ObjectId(req.param('postId')) }
        database.updateDocumentByFilter(database.iTravelDB.Posts, queryObj, newListRating)
            .then((updateResult) => {
                // matchedCount is default result will be returned by mongodb
                if (updateResult.matchedCount === 1) {
                    res.status(201).json({
                        message: 'Send Rating Success'
                    });
                } else {
                    res.status(200).json({
                        message: 'Not found post'
                    });
                }
            })
            .catch((err) => {
                console.log('Send Rating Has Err');
            })
    }
});

/**
 * @name GET-notification
 * @author Thong
 * @param userId used for get notification of that user
 */
app.get('/user/get-notification', (req, res) => {
    // let token = req.headers.authorization;
    const userId = req.param('userId');

    // token and user is valid, go to get notification of user
    const queryObj = { userId: userId }

    database.getOneFromCollection(database.iTravelDB.Notifications, queryObj)
        .then((receiveData) => {
            if (receiveData) {
                res.status(200).json({
                    message: 'Get user notification successfully!',
                    data: receiveData // because receiceData is an array
                })
            } else {
                res.status(200).json({
                    message: 'Failed! Can not find user notification'
                })
            }
        });
});

/**
 * @name POST-new-notification
 * @author Thong
 * @param request
 * @description receive request from serverService, include new notification in requestBody
 * then insert it to mongodb, send back response with message
 */
app.post('/user/create-notification', (req, res, next) => {
    const notification = req.body;
    // TODO validate notification
    database.insertOneToColection(database.iTravelDB.Notifications, notification)
        .then(() => {
            res.status(200).json({
                message: 'Success!'
            });
        }).catch(() => {
            res.status(500).json({
                message: 'Fail!'
            });
        });
});

/**
 * @name PATCH-notification-change (has change or has new)
 * @author Thong
 * @param {NotificationItem[]} listNotificationItem use for update 
 */
app.patch('/user/send-notification', async (req, res) => {
    // pass validate token
    // validate list notificationItem use to update
    if (req.body.length <= 0) {
        res.status(200).json({
            message: 'Invalid list notificationItems'
        })
    } else {
        // validate the all notificationItem
        for (const eachNotify of req.body) {
            // validate some basic length
            if (eachNotify.from.length !== 24
                || eachNotify.to.length !== 24
                || eachNotify.content.length <= 0
                || eachNotify.content.length > 200
                || eachNotify.linkTo.length > 200) {
                console.log('validate notifications fail');
                res.status(200).json({
                    message: 'Invalid list notifications'
                })
                return;
            }
        }
        // pass the validate => go to update
        // obj store all notificationItems for update
        const newListNotifications = {
            "notificationItems": req.body
        };
        newListNotifications.notificationItems = newListNotifications.notificationItems.map((notiItem) => {
            notiItem._id = new ObjectId(notiItem._id)
            return notiItem
        })
        // create query object from userId
        const userId = authentication.getTokenUserId(req.headers.authorization);
        const queryObj = { userId: userId };

        database.updateDocumentByFilter(database.iTravelDB.Notifications, queryObj, newListNotifications)
            .then((updateResult) => {
                // matchedCount is default result will be returned by mongodb
                if (updateResult.matchedCount === 1) {
                    res.status(201).json({
                        message: 'Notify Success'
                    });
                } else {
                    res.status(200).json({
                        message: 'Not found notification to update'
                    });
                }
            })
            .catch((err) => {
                console.log('Notify Has Error');
            })
    }
});
// Routing - END