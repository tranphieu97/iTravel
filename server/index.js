// Include js file
const config = require('./_config');
const database = require('./app/database.js');
const authetication = require('./app/authentication.js');
const User = require('./model/user.model').User;
const postService = require('./app/post-service');

// Include library
const path = require('path');
const express = require('express');
var ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
var Q = require('q');
var cors = require('cors')({ origin: true });

// Create and export server app by express
const app = module.exports = express();

// Server's base config
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// allow outside connect to /images and map to server/images folder on server
app.use('/api/images', express.static(path.join("server/images")))

app.listen(config.APP_PORT, () => {
    console.log('Server is running at http://localhost:' + config.APP_PORT + '/');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token, App-Auth, X-XSRF-TOKEN, Authorization');

    // check token
    const url = req.url;
    let token = req.headers.authorization;

    if (token !== undefined) {
        token = token.split(' ')[1];
    }

    if (url.indexOf('/api/') === -1 && url.indexOf('/auth/') === -1 && (token === null || token === undefined)) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }

    next();
});

// Use routings in others controller
require('./app/routing/api-routing.js');
require('./app/routing/authentication-routing');
require('./app/routing/manager-routing.js');
require('./app/routing/user-routing.js');

/** Routing - START */
app.get('/api/user-info', (req, res) => {
    if (req.param('userId') === null || req.param('userId') === undefined || req.param('userId').length !== 24) {
        res.status(200).json({
            message: 'Invalid user Id'
        })
    }
    else {
        // in request has post Id, create query object from that
        const queryObj = { _id: new ObjectId(req.param('userId')) }
        // console.log(queryObj);

        // create projection object to return only id, username, avatar
        const projectionObj = { projection: { _id: 1, firstName: 1, lastName: 1, avatar: 1 } }
        // console.log(projectionObj);

        database.getOneWithProjection(database.iTravelDB.Users, queryObj, projectionObj)
            .then((receiceData) => {
                if (receiceData !== null && receiceData !== undefined) {
                    res.status(200).json({
                        message: 'Get userinfo successfully!',
                        data: receiceData // because receiceData is an array
                    })
                } else {
                    res.status(200).json({
                        message: 'Failed! Can not find userinfo'
                    })
                }
            });
    }
});

/**
 * @name GET-one-post
 * @author Thong
 * @param {postId}
 * @description receive request from serverService, include a postId in request
 * then query the post has that Id
 */
app.get('/api/post', (req, res) => {
    if (!req.param('postId') || req.param('postId').length !== 24) {
        res.status(200).json({
            message: 'Invalid post Id'
        })
    } else {
        // in request has post Id, create query object from that
        const queryObj = { _id: new ObjectId(req.param('postId')) }

        //
        postService.countViewPost(req.param('postId'));
        //
        database.getCollectionFilterData(database.iTravelDB.Posts, queryObj)
            .then(([post]) => {
                if (post) {
                    console.log('Get one post by id successfuly!');
                    res.status(200).json({
                        message: 'Get one post by id successfuly!',
                        data: post
                    })
                } else {
                    res.status(200).json({
                        message: 'Failed! Please make sure post Id is exist'
                    })
                }
            });

    }
});

/**
 * @name POST-new-post
 * @author Thong
 * @param request
 * @description receive request from serverService, include a postData in requestBody
 * then insert that post to mongodb, send back response with message
 */
app.post('/user/post', (req, res, next) => {
    // get post from request
    const post = req.body;
    // get token from header
    let token = req.headers.authorization;
    let userId = '';
    if (token !== undefined && token !== null) {
        token = token.split(' ')[1];
    }
    // decode token
    if (token === undefined || token === null) {
        console.log('Token can not be null or undefined');
        res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        const tokenData = jwt.verify(token, config.SECRET_KEY);
        userId = tokenData._id;
        // check user in token and in post is the same
        if (userId !== post.authorId) {
            console.log('User in token must same as author in post:\n' + userId + '!==' + post.authorId);
            res.status(401).json({
                message: 'Unauthorized'
            });
        } else {
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
                res.status(500).json({
                    message: 'Upload post fail!'
                });
            } else {
                // fix some properties to default value
                post._id = new ObjectId();
                // fix createdTime from string to Date type
                post.createdTime = new Date(post.createdTime);
                post.approvedTime = null;
                post.viewAmount = 0;
                // fix all post tags._id = ObjectId()
                for (const tag of post.tags) {
                    if (tag._id.length !== 24) {
                        tag._id = new ObjectId();
                    }
                }
                // fix all post content_id = ObjectId()
                for (const postContent of post.postContents) {
                    if (postContent._id.length !== 24 || postContent._id === null) {
                        postContent._id = new ObjectId();
                    }
                }
                post.location._id = new ObjectId();
                // fix all post categories._id =  ObjectId()
                for (const category of post.categories) {
                    category._id = new ObjectId(category._id);
                }
                post.rating = 0;
                post.status = 'PENDING';
                // fix all complete
                // pass the post to insertOneToColection(), function will upload to server automaticaly
                database.insertOneToColection(database.iTravelDB.Posts, post)
                    .then(() => {
                        console.log('Upload post to mongodb successfuly');
                        res.status(200).json({
                            message: 'Upload post successfuLly',
                            postId: post._id
                        });
                    })
                    .catch(() => {
                        console.log('Upload post to mongodb fail');
                        res.status(200).json({
                            message: 'Upload post fail!'
                        });
                    });
            }
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
    // get token from header
    let token = req.headers.authorization;
    let userId = '';
    if (token !== undefined && token !== null) {
        token = token.split(' ')[1];
    }
    // decode token
    if (token === undefined || token === null) {
        console.log('Token can not null or undefined');
        res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        const tokenData = jwt.verify(token, config.SECRET_KEY);
        userId = tokenData._id;
        // check user in token and in post is the same
        if (userId !== post.authorId) {
            console.log('User in token must same as author in post:\n' + userId + '!==' + post.authorId);
            res.status(401).json({
                message: 'Unauthorized'
            });
        } else {
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
                // pass the post to replayDocumentById(), function will replay by filter
                database.replayDocumentById(database.iTravelDB.Posts, filterObj, post)
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
        }
    }
});

/**
 * @name PATCH-new-comment
 * @author Thong
 * @param {string} postId
 * @param {Comment[]} listComment use for update 
 */
app.patch('/user/send-comment', (req, res) => {
    // get token from header
    let token = req.headers.authorization;
    let userId = '';
    if (token !== undefined && token !== null) {
        token = token.split(' ')[1];
    }
    // decode and validate token
    if (token === undefined || token === null) {
        console.log('Token can not be null or undefined');
        res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        // validate userId in token
        const tokenData = jwt.verify(token, config.SECRET_KEY);
        userId = tokenData._id;
        if (userId.length !== 24) {
            console.log('Invalid user in token');
            res.status(401).json({
                message: 'Unauthorized'
            });
        } else {
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
    // get token from header
    let token = req.headers.authorization;
    let userId = '';
    if (token !== undefined && token !== null) {
        token = token.split(' ')[1];
    }
    // decode and validate token
    if (token === undefined || token === null) {
        console.log('Token can not be null or undefined');
        res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        // validate userId in token
        const tokenData = jwt.verify(token, config.SECRET_KEY);
        userId = tokenData._id;
        if (userId.length !== 24) {
            console.log('Invalid user in token');
            res.status(401).json({
                message: 'Unauthorized'
            });
        } else {
            // pass validate token
            // validate postId param
            if (!req.param('postId') || req.param('postId').length !== 24) {
                res.status(200).json({
                    message: 'Invalid post Id'
                })
            }
            else {
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
            }
        }
    }
});

/**
 * @author Thong
 * @description config multer for store image on server
 */
const storage = multer.diskStorage({
    destination: (req, file, cback) => {
        // check file type is valid
        const isValid = config.MINE_TYPE_MAP[file.mimetype];
        let err = new Error('Invalid mine type');
        if (isValid) {
            err = null;
        }
        cback(err, 'server/images');
    },
    filename: (req, file, cback) => {
        // remove space and replace by '-'
        const name = file.originalname.toLowerCase().trim().split(' ').join('-');
        const ext = config.MINE_TYPE_MAP[file.mimetype];
        cback(null, name + '-' + Date.now() + '.' + ext);
    }
});

/**
 * @name POST-image
 * @author Thong
 * @param request
 * @description receive request include a file and store on server
 */
app.post('/api/upload-image', multer({ storage: storage }).array('images'), (req, res, next) => {
    // variable store imageUrls to send response
    imageUrls = [];
    // some variable used for construct image url
    urlProtocol = req.protocol + '://'; // => http://
    urlHost = req.get("host"); // => localhost:7979
    // create url foreach image
    for (const file of req.files) {
        const imageUrl = urlProtocol + urlHost
            + "/api/images/" // => http://localhost:7979/api/images/
            + file.filename; // => http://localhost:7979/api/images/abc.jpg
        imageUrls.push(imageUrl);
    }
    res.status(201).json({
        message: 'Upload image successfuly',
        imageUrls: imageUrls
    });
});
/** Routing - END */
