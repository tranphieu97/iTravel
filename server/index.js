
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

const app = express();

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

/** Routing - START */
app.get('/', (req, res) => {
    res.send('http://localhost:7979/');
});

app.get('/api/provinces', (req, res) => {
    database.getCollectionData(database.iTravelDB.ProvinceCity)
        .then((data) => {
            if (data != null) {
                res.status(200).json({
                    message: 'Load ' + database.iTravelDB.ProvinceCity + ' success!',
                    data: data
                });
            } else {
                res.status(500).json({
                    message: 'Load' + database.iTravelDB.ProvinceCity + 'fail!'
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.ProvinceCity + 'fail!'
            });
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

app.get('/api/policies', (req, res) => {
    database.getCollectionData(database.iTravelDB.Policies)
        .then((result) => {
            var vnPolicies = [];
            var enPolicies = [];

            result.forEach(policy => {
                vnPolicies.push({
                    title: policy.vnTitle,
                    content: policy.vnContent
                });
                enPolicies.push({
                    title: policy.enTitle,
                    content: policy.enContent
                });
            });

            var listPolciesMoreLanguage = {
                vnPolicies: vnPolicies,
                enPolicies: enPolicies
            };

            res.status(200).json({
                message: 'Get policies success',
                data: listPolciesMoreLanguage
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Get policies fail'
            });
        })
})

app.get('/api/cardview-post', (req, res) => {
    // const COLECTION_NAME = 'Posts';
    const approvedPostFilter = {
        status: {
            $eq: config.POST_STATUS.APPROVED
        }
    }
    database.getCollectionFilterData(database.iTravelDB.Posts, approvedPostFilter).then((data) => {
        if (data != null) {
            postSimpleData = []

            data.forEach((post) => {
                postSimpleData.push({
                    _id: post._id,
                    title: post.title,
                    cover: post.cover,
                    categories: post.categories,
                    createdTime: post.createdTime,
                    description: post.description,
                    location: post.location,
                    viewAmount: post.viewAmount
                });
            })

            res.status(200).json({
                message: 'Load ' + database.iTravelDB.Posts + ' success!',
                data: postSimpleData
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.Posts + 'fail!'
            })
        }
    });
});

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
                post.rating = [];
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
            $and: [
                {
                    creationTime: {
                        $gte: startDate
                    }
                },
                {
                    creationTime: {
                        $lte: endDate
                    }
                }
            ]

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

app.get('/api/report/post-view-amount', async (req, res) => {
    const postFilter = {
        'status': {
            $eq: config.POST_STATUS.APPROVED
        }
    }

    database.getCollectionFilterData(database.iTravelDB.Posts, postFilter)
        .then((result) => {
            postSimpleData = [];
            if (result) {
                result.forEach(post => {
                    postSimpleData.push({
                        title: post.title,
                        viewAmount: post.viewAmount
                    });
                });
            }

            res.status(200).json({
                message: 'Got post view amount Data',
                data: postSimpleData
            });
        });
});

app.get('/api/region-posts', async (req, res) => {
    let region = req.param('region');

    if (region === undefined) {
        res.status(404).json({
            message: 'Not found region'
        });
    } else {
        // Get region's name in Vietnamese
        region = config.REGION_NAME[region.toUpperCase()];

        if (region === undefined) {
            res.status(404).json({
                message: 'Not found region'
            });
        } else {
            regionFilter = {
                regionOfCountry: {
                    $eq: region
                }
            }

            database.getCollectionFilterData(database.iTravelDB.ProvinceCity, regionFilter)
                .then((listProvince) => {
                    if (listProvince) {
                        listProvince = listProvince.map(province => province.provinceName);

                        // Filter in array provinceCity least had an element in listProvince 
                        postFilter = {
                            'location.provinceCity': {
                                $elemMatch: {
                                    $in: listProvince
                                }
                            },
                            'status': {
                                $eq: config.POST_STATUS.APPROVED
                            }
                        }

                        database.getCollectionFilterData(database.iTravelDB.Posts, postFilter)
                            .then((listPost) => {
                                postSimpleData = []

                                listPost.forEach((post) => {
                                    postSimpleData.push({
                                        _id: post._id,
                                        title: post.title,
                                        cover: post.cover,
                                        categories: post.categories,
                                        createdTime: post.createdTime,
                                        description: post.description,
                                        location: post.location,
                                        viewAmount: post.viewAmount
                                    });
                                });

                                res.status(200).json({
                                    message: 'Get success',
                                    data: postSimpleData
                                });
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    message: 'Get fail'
                                });
                            });
                    }
                });
        }
    }
});

app.get('/api/category-posts', async (req, res) => {
    let categoryName = req.param('category');

    if (categoryName === undefined) {
        res.status(404).json({
            message: 'Not found region'
        });
    } else {
        categoryFilter = {
            "name": categoryName
        }

        database.getOneFromCollection(database.iTravelDB.PostCategories, categoryFilter)
            .then((category) => {
                if (category) {
                    postFilter = {
                        'categories': {
                            $elemMatch: {
                                $in: [category]
                            }
                        },
                        'status': {
                            $eq: config.POST_STATUS.APPROVED
                        }
                    }

                    database.getCollectionFilterData(database.iTravelDB.Posts, postFilter)
                        .then((listPost) => {
                            postSimpleData = []

                            listPost.forEach((post) => {
                                postSimpleData.push({
                                    _id: post._id,
                                    title: post.title,
                                    cover: post.cover,
                                    categories: post.categories,
                                    createdTime: post.createdTime,
                                    description: post.description,
                                    location: post.location,
                                    viewAmount: post.viewAmount
                                });
                            });

                            res.status(200).json({
                                message: 'Get success',
                                data: postSimpleData
                            });
                        })
                        .catch((err) => {
                            res.status(400).json({
                                message: 'Get fail'
                            });
                        });
                } else {
                    res.status(400).json({
                        message: 'Get fail'
                    });
                }
            });
    }
});

app.get('/api/region-ratio', async (req, res) => {
    let region = req.param('region');

    if (region === undefined) {
        res.status(404).json({
            message: 'Not found region'
        });
    } else {
        // Get region's name in Vietnamese
        region = config.REGION_NAME[region.toUpperCase()];

        if (region === undefined) {
            res.status(404).json({
                message: 'Not found region'
            });
        } else {
            regionFilter = {
                regionOfCountry: {
                    $eq: region
                }
            }

            database.getCollectionFilterData(database.iTravelDB.ProvinceCity, regionFilter)
                .then((listProvince) => {
                    if (listProvince) {
                        listProvince = listProvince.map(province => province.provinceName);

                        // Filter in array provinceCity least had an element in listProvince 
                        postFilterRegion = {
                            'location.provinceCity': {
                                $elemMatch: {
                                    $in: listProvince
                                }
                            },
                            'status': {
                                $eq: config.POST_STATUS.APPROVED
                            }
                        }

                        database.countDocumentByFilter(database.iTravelDB.Posts, postFilterRegion)
                            .then((amountRegionPost) => {
                                // Count all post was approved
                                postFilterApproved = {
                                    'status': {
                                        $eq: config.POST_STATUS.APPROVED
                                    }
                                }

                                database.countDocumentByFilter(database.iTravelDB.Posts, postFilterApproved)
                                    .then((amountAllPost) => {
                                        res.status(200).json({
                                            amountRegionPost: amountRegionPost,
                                            amountAllPost: amountAllPost,
                                            message: 'Get success'
                                        });
                                    })
                                    .catch((err) => {
                                        res.status(400).json({
                                            message: 'Get fail'
                                        });
                                    });
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    message: 'Get fail'
                                });
                            });
                    }
                });
        }
    }
});

app.get('/auth/exist-username', async (req, res) => {

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
                    });
                }
            });
    }
});

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
})

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
/** Routing - END */
