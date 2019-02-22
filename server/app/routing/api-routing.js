// Include js file
const database = require('../database.js');
const config = require('../../_config.js');

// Get app instance from index
const app = require('../../index');
var ObjectId = require('mongodb').ObjectId;

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
// Routing - END