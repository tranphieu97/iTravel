// Include js file
const database = require('../database.js');
const config = require('../../_config.js');

// Get app instance from index
const app = require('../../index');

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
// Routing - END