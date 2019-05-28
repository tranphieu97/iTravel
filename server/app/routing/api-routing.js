// Include js file
const database = require('../database.js');
const config = require('../../_config.js');

// Import models file
const { Tour } = require('../../model/mongoose/models')

// Get app instance from index
const jwt = require('jsonwebtoken');
const app = require('../../index');
var ObjectId = require('mongodb').ObjectId;
const postService = require('../services/post-service.js');
const User = require('../../model/user.model').User;

// Routing - START
/**
 * @name API - GET Menu
 * @author phieu-th
 * @description 
 * @returns
 */
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

/**
 * @name API - GET Province
 * @author phieu-th
 * @description 
 * @returns
 */
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

/**
 * @name API - GET Province
 * @author phieu-th
 * @description 
 * @returns
 */
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

/**
 * @name API - GET Policies
 * @author phieu-th
 * @description 
 * @returns response GET's result
 */
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
});

/**
 * @name API - POST Create Feedback
 * @author phieu-th
 * @description 
 * @returns response Create result
 */
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
            });
    }
});

/**
 * @name API - GET All CardViewPost 
 * @author phieu-th
 * @description 
 * @returns response GET result
 */
app.get('/api/cardview-post', (req, res) => {
    const approvedPostFilter = {
        status: {
            $eq: config.POST_STATUS.APPROVED
        }
    };
    
    database.getCollectionFilterData(database.iTravelDB.Posts, approvedPostFilter)
        .then((collectionData) => {
        if (collectionData != null) {
            postSimpleData = [];

            collectionData.forEach((post) => {
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
                message: 'Load ' + database.iTravelDB.Posts + ' success!',
                data: postSimpleData
            });
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.Posts + 'fail!'
            });
        }
    });
});

/**
 * @name API - POST Create Search History
 * @author phieu-th
 * @description 
 */
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
                res.status(201).json({
                    message: 'Success!'
                });
            }).catch(() => {
                res.status(500).json({
                    message: 'Fail!'
                });
            })
    }
});

/**
 * @name API - GET Report data by search keyword
 * @author phieu-th
 * @description 
 * @returns response GET result
 */
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
});

/**
 * @name API - GET Report data by search view amount
 * @author phieu-th
 * @description 
 * @returns response GET result
 */
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

/**
 * @name API - GET Posts by Region
 * @author phieu-th
 * @description 
 * @returns response GET result
 */
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

/**
 * @name API - GET Posts by Categories
 * @author phieu-th
 * @description 
 * @returns response GET result
 */
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

/**
 * @name API - GET Post Ratio by region's name
 * @author phieu-th
 * @description 
 * @returns response GET result
 */
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
 * @name GET-one-location
 * @author Thong
 * @param {locationId}
 * @description receive request from serverService, include a postId in request
 * then query the post has that Id
 */
app.get('/api/location', (req, res) => {
    if (!req.param('id') || req.param('id').length !== 24) {
        res.status(200).json({
            message: 'Invalid location Id'
        })
    } else {
        // in request has post Id, create query object from that
        const queryObj = { _id: new ObjectId(req.param('id')) }

        const projectionObj = { }

        database.getOneWithProjection(database.iTravelDB.Locations, queryObj, projectionObj)
            .then((receiveData) => {
                if (receiveData) {
                    res.status(200).json({
                        message: 'Get location by id successfully!',
                        data: receiveData
                    })
                } else {
                    res.status(200).json({
                        message: `Failed! Can not find location ${req.param('id')}`
                    })
                }
            })
            .catch(err => console.log('GET-one-location', err.message))
    }
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

/**
 * @name
 * @author Thong
 * @description
 * 
 */
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
            .then((receiveData) => {
                if (receiveData !== null && receiveData !== undefined) {
                    res.status(200).json({
                        message: 'Get userinfo successfully!',
                        data: receiveData // because receiceData is an array
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

app.get('/api/province-locations', (req, res) => {
    const arrProvincesName = req.param('arrProvincesName');

    if (arrProvincesName !== undefined && arrProvincesName.length > 0) {
        let filterProvince = {
            'provinceCity': {
                $elemMatch: {
                    $in: arrProvincesName
                }
            }
        };

        // If array just contains 1 item, request understand it become string
        // So, that string need change to array
        if (typeof arrProvincesName === 'string') {
            filterProvince = {
                'provinceCity': {
                    $elemMatch: {
                        $in: [arrProvincesName]
                    }
                }
            };
        }
        

        database.getCollectionFilterData(database.iTravelDB.Locations, filterProvince)
            .then((collectionData) => {
                res.status(200).json({
                    data: collectionData
                });
            })
            .catch(() => {
                res.status(404).json({
                    data: []
                });
            })
    } else {
        res.status(404).json({
            data: []
        });
    }
});

/**
 * @name getTour
 * @param {tourId}
 * @author Thong
 */
app.get('/api/get-tour', async (req, res) => {
    try {
        const tourId = req.param('tourId')
        const tour = await Tour.findById(tourId)
        res.status(200).json({
            data: tour,
            message: 'Success!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Fail!'
        });
    }
});

function newFunction() {
    return '../../model/user.model';
}
// Routing - END