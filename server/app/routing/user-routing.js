// Include js file
const database = require('../database.js');
const config = require('../../_config.js');
const authentication = require('../authentication.js');

// Include library
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const request = require('request');

// Import models file
const { Tour } = require('../../model/mongoose/models')

// Get app instance from index
const app = require('../../index');
const tourService = require('../services/tour-service');
const notificationService = require('../services/notification-service');
const userInterestService = require('../services/userInterest.service');
const UserInterestService = require('../services/userInterest.service');

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
 * @name USER - GET User's profile
 * @author phieu-th
 * @description
 * @returns 
 */
app.get('/user/information', async (req, res) => {
    const userId = req.param('userId');

    const userFilter = {
        '_id': new ObjectId(userId)
    };

    const inforProjection = {
        projection: {
            avatar: 1,
            hometown: 1,
            birthDay: 1,
            firstName: 1,
            lastName: 1,
            email: 1
        }
    };

    database.getOneWithProjection(database.iTravelDB.Users, userFilter, inforProjection)
        .then((userInfo) => {
            if (userInfo) {
                res.status(200).json({
                    data: userInfo,
                    statusCode: 200
                });
            } else {
                res.status(200).json({
                    statusCode: 404
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({
                statusCode: 404
            });
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
                        let isTourguide = false;

                        if (userInfo.permission.includes(config.USER_PERMISSION.ADMIN)) {
                            isAdmin = true;
                        }

                        if (userInfo.permission.includes(config.USER_PERMISSION.TOURGUIDE)) {
                            isTourguide = true;
                        }

                        const userData = {
                            _id: userInfo._id,
                            username: userInfo.username,
                            isAdmin: isAdmin,
                            isTourguide: isTourguide
                        }

                        const data = {
                            _id: userInfo._id,
                            username: userInfo.username,
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            avatar: userInfo.avatar,
                            isAdmin: isAdmin,
                            isTourguide: isTourguide
                        }
                        authentication.insertUserSignInLog(userInfo.username);
                        UserInterestService.updateUserInterest(userInfo._id);
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
 * @name PATCH-notification-change (has change)
 * @author Thong
 * @param {NotificationItem[]} listNotificationItem use for update 
 */
app.patch('/user/update-notification', async (req, res) => {
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
                || eachNotify.content.length <= 0
                || eachNotify.content.length > 200
                || eachNotify.linkTo.length > 200) {
                console.log('validate notifications fail', eachNotify);
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
            !notiItem._id
                ? notiItem._id = new ObjectId()
                : notiItem._id = new ObjectId(notiItem._id);
            return notiItem;
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

/**
 * @name PATCH-send-notification (add new)
 * @author Thong
 * @param {NotificationItem} NotificationItem use for add new
 * @param {receiverList} id List
 */
app.patch('/user/send-notification', async (req, res) => {
    try {
        const newNotificationItem = req.body.newNotificationItem;
        const receiverList = req.body.receiverList;
        const userId = authentication.getTokenUserId(req.headers.authorization);
        if (!newNotificationItem) {
            res.json({
                message: 'Invalid notificationItem'
            })
            return;
        }
        if (!receiverList || !receiverList.length) {
            res.json({
                message: 'Invalid receiverList'
            })
            return;
        }
        // validate the notificationItem content
        if (newNotificationItem.from !== userId
            || newNotificationItem.content.length <= 0
            || newNotificationItem.content.length > 200
            || newNotificationItem.linkTo.length > 200) {
            res.status(200).json({
                message: 'Invalid notification'
            })
            return;
        }
        // pass the validate => go to update
        const result = await notificationService.sendNotification(
            newNotificationItem,
            userId
        );
        // const result = await database.updateManyDocument(database.iTravelDB.Notifications, queryObj, updateObject);
        if(!result.matchedCount) {
            res.json({
                message: 'receiver not found'
            });
            return;
        } else if(!result.modifiedCount) {
            res.json({
                message: 'failed',
                statusCode: 500
            });
            return;
        } else {
            res.json({
                message: 'success',
                detail: `success ${result.modifiedCount}/${result.matchedCount}`
            });
            return;
        }
    } catch (error) {
        res.json({
            message: error.message,
            statusCode: 500
        });
        return;
    }
});

app.patch('/user/upload-avatar', (req, res) => {
    if (req.body) {
        const userFilter = {
            '_id': new ObjectId(req.body.userId)
        };

        const changedField = {
            'avatar': req.body.imgLink
        };

        database.updateDocumentByFilter(database.iTravelDB.Users, userFilter, changedField)
            .then((updateResult) => {
                if (updateResult.matchedCount === 1) {
                    res.status(200).json({
                        statusCode: 201
                    });
                } else {
                    res.status(200).json({
                        statusCode: 404
                    });
                }
            })
            .catch(() => {
                res.status(200).json({
                    statusCode: 404
                });
            });
    } else {
        res.status(200).json({
            statusCode: 404
        });
    }
});

app.patch('/user/update-profile', async (req, res) => {
    if (req.body) {
        const userFilter = {
            '_id': new ObjectId(req.body._id)
        };

        const changedField = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'birthDay': req.body.birthDay,
            'hometown': req.body.hometown
        };

        database.updateDocumentByFilter(database.iTravelDB.Users, userFilter, changedField)
            .then((updateResult) => {
                if (updateResult.matchedCount === 1) {
                    res.status(200).json({
                        statusCode: 201
                    });
                } else {
                    res.status(200).json({
                        statusCode: 404
                    });
                }
            })
            .catch(() => {
                res.status(200).json({
                    statusCode: 404
                });
            });
    } else {
        res.status(200).json({
            statusCode: 404
        });
    }
});

/**
 * @name getTours
 * @author Thong
 */
app.get('/user/get-tours', async (req, res) => {
    try {
        let queryObj = { isActive: true };
        if (req.param('userId')) {
            const userId = authentication.getTokenUserId(req.headers.authorization);
            queryObj = {
                isActive: true,
                'members.memberId': userId,
                'members.cancelTime': null
            };
        }

        let tours = await Tour.find(queryObj);
        tours = tourService.updateTourStatus(tours);

        res.status(200).json({
            data: tours,
            message: 'Success!'
        });
    } catch (error) {
        console.log('error', error.message)
        res.status(200).json({
            message: error.message,
            statusCode: 500
        });
    }
});

/**
 * @name updateTourPreparation  for user
 * @param {Tour}
 * @author Thong
 */
app.patch('/user/update-tour-preparation', async (req, res) => {
    try {
        const tourId = req.query.tourId;
        const preparationId = req.query.preparationId;
        let queryObj;
        if (tourId && preparationId) {
            queryObj = {
                _id: tourId,
                'preparations._id': preparationId
            };
        } else {
            console.log('Update preparation error: Invalid param');
            res.status(200).json({
                message: 'Invalid param'
            });
        }
        const needUpdateObj = req.body;
        // fix _id from string to ObjectId
        needUpdateObj.performers = needUpdateObj.performers.map(performer => {
            performer._id = new ObjectId(performer._id);
            return performer;
        });
        await Tour.updateOne(queryObj,
            {
                $set: {
                    'preparations.$.performers': needUpdateObj.performers,
                    'preparations.$.status': needUpdateObj.status
                }
            });
        console.log('Update preparation successful');
        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        console.log('Update preparation failed:', error.message);
        res.status(200).json({
            message: error.message
        });
    }
});

/**
 * @name updateCancelTour - cancel tour
 * @param {Tour}
 * @author Thong
 */
app.patch('/user/update-cancel-tour', async (req, res) => {
    try {
        // const updatedTour = new Tour(req.body)
        const { schedules, preparations, members } = req.body
        const tourId = req.query.tourId
        await Tour.updateOne({ _id: tourId }, { $set: {
            schedules, preparations, members
        }})
        console.log('update-cancel-tour sucessful');
        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        console.log('update-cancel-tour failed');
        res.status(200).json({
            message: error.message,
            statusCode: 500
        });
    }
});

/**
 * @author Thong
 */
app.patch('/user/update-tour-interest-point', async (req, res) => {
    try {
        const tourId = req.body.tourId
        const value = req.body.value
        const userId = authentication.getTokenUserId(req.headers.authorization);
        
        await userInterestService.updateTourInterestPoint(userId, tourId, value);

        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        console.log('update point failed');
        res.json({
            message: error.message,
            statusCode: 500
        });
    }
});

/**
 * @author Thong
 */
app.get('/user/get-tour-interest', async (req, res) => {
    try {
        const userId = authentication.getTokenUserId(req.headers.authorization);
        const listTour = await userInterestService.findTourInterestByUser(userId);
        res.status(200).json({
            message: 'Success',
            data: listTour
        });
    } catch (error) {
        console.log('update point failed');
        res.json({
            message: error.message,
            statusCode: 500
        });
    }
});

/**
 * @name sendTourFeedbacks
 * @param {tourId}
 * @param {newFeedback}
 * @author Thong
 */
app.patch('/user/send-tour-feedback', async (req, res) => {
    try {
        const id = req.query.tourId;
        const newFeedback = Object.assign(req.body, { time: new Date() });
        await Tour.updateOne({ _id: id }, { $push: { 'feedbacks': newFeedback } })
        console.log('Send tour feedback successful')
        res.json({
            message: 'Success',
            statusCode: 200
        });
    } catch (error) {
        console.log('Send tour feedback failed')
        res.json({
            message: error.message,
            statusCode: 500
        });
    }
});

app.get('/api/get-location', (req, res) => {
    const forwarded = req.headers['x-forwarded-for']
    console.log('x-forwarded-for', forwarded)
    console.log('req.connection.remoteAddress', req.connection.remoteAddress)
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    request(
        { url: `http://ip-api.com/json/${ip}` },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: err.message });
          }
    
          res.json(JSON.parse(body));
        }
    )
    // res.json({
    //     message: 'testing'
    // })
})

app.patch('/user/reviewer-feedback', async (req, res) => {
    const revieverFeedback = req.body;
    try {
        if (revieverFeedback && revieverFeedback._id) {
            await Tour.updateOne(
                {
                    '_id': revieverFeedback.tourId,
                    'reviewers._id': new ObjectId(revieverFeedback._id),
                    'reviewers.reviewerId': revieverFeedback.submiterId
                },
                {
                    $set: {
                        'reviewers.$.state': revieverFeedback.state,
                        'reviewers.$.feedback': revieverFeedback.feedback
                    }
                },
                (err, raw) => {
                    if (err) {
                        res.status(200).json({
                            statusCode: 403,
                            message: err
                        });
                    } else if (raw.n === 1) {
                        res.status(201).json({
                            statusCode: 201,
                            message: 'Success'
                        });
                    } else {
                        res.status(200).json({
                            statusCode: 403,
                            message: 'Not found reviewer'
                        });
                    }
                }
            );
        }
    } catch (err) {
        res.status(200).json({
            statusCode: 500,
            message: 'Server error'
        });
    }
});

app.patch('/user/register-tour', async (req, res) => {
    const registerBody = req.body;
    try {
        if (registerBody._id && registerBody.registerObj) {
            let tourRegistered = await Tour.findById(new ObjectId(registerBody._id), '_id memberLimit members');
            tourRegistered.members = tourRegistered.members.filter(x => !x.cancelTime);

            let currentRegisterd = 0;
            tourRegistered.members.forEach(member => {
                currentRegisterd = currentRegisterd + member.registerFor;
            });

            // Request change registerFor property type to string
            registerBody.registerObj.registerFor = parseInt(registerBody.registerObj.registerFor, 10);
            if (currentRegisterd + registerBody.registerObj.registerFor > tourRegistered.memberLimit) {
                res.status(200).json({
                    statusCode: 200,
                    result: {
                        overLimit: true,
                        success: false
                    }
                });
            } else {
                await Tour.updateOne({ _id: registerBody._id }, {
                    $addToSet: {
                        'members': registerBody.registerObj
                    }
                }, (err, raw) => {
                    if (err) {
                        res.status(200).json({
                            statusCode: 200,
                            result: {
                                overLimit: false,
                                success: false
                            }
                        });
                    } else {
                        res.status(201).json({
                            statusCode: 201,
                            result: {
                                overLimit: false,
                                success: true
                            }
                        });
                    }
                });
            }

        } else {
            res.status(200).json({
                statusCode: 404
            });
        }
    } catch (err) {
        res.status(200).json({
            statusCode: 500,
            result: {
                overLimit: false,
                success: false
            }
        });
    }
});
// Routing - END