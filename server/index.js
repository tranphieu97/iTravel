
// Include js file
const config = require('./_config');
const database = require('./app/database.js');

// Include library
const path = require('path');
const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var Q = require('q');

const app = express();

// some extention of image that allow to save on server
const MINE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
};
/**
 * @author Thong
 * @description config multer for store image on server
 */
const storage = multer.diskStorage({
    destination: (req, file, cback) => {
        // check file type is valid
        const isValid = MINE_TYPE_MAP[file.mimetype];
        let err = new Error('Invalid mine type');
        if (isValid) {
            err = null;
        }
        cback(err, 'server/images');
    },
    filename: (req, file, cback) => {
        // remove space and replace by '-'
        const name = file.originalname.toLowerCase().trim().split(' ').join('-');
        const ext = MINE_TYPE_MAP[file.mimetype];
        cback(null, name + '-' + Date.now() + '.' + ext);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// allow outside connect to /images and map to server/images folder on server
app.use('/images', express.static(path.join("server/images")))

app.listen(config.APP_PORT, () => {
    console.log('Server is running at http://localhost:' + config.APP_PORT + '/');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/** Routing - START */
app.get('/', (req, res) => {
    res.send('http://localhost:7979/');
});

app.get('/db/provinces', (req, res) => {
    database.getCollectionData(database.iTravelDB.pro).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load ' + database.iTravelDB.Provinces + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.Provinces + 'fail!'
            })
        }
    });
});

app.get('/db/province-city', (req, res) => {
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

app.get('/db/menu', (req, res) => {
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

app.get('/db/posts', (req, res) => {
    // const COLECTION_NAME = 'Posts';
    database.getCollectionData(database.iTravelDB.Posts).then((data) => {
        if (data != null) {
            res.status(200).json({
                message: 'Load ' + database.iTravelDB.Posts + ' success!',
                data: data
            })
        } else {
            res.status(500).json({
                message: 'Load' + database.iTravelDB.Posts + 'fail!'
            })
        }
    });
});

/**
 * @name POST-new-post
 * @author Thong
 * @param request
 * @description receive request from serverService, include a postData in requestBody
 * then insert that post to mongodb, send back response with message
 */
app.post('/db/posts', (req, res, next) => {
    const post = req.body;
    // pass a post to insertOneToColection(), function will upload to server automaticaly
    database.insertOneToColection(database.iTravelDB.Posts, post)
        .then(() => {
            res.status(201).json({
                message: 'Upload post successfuly'
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'Upload post fail!'
            });
        });
});

app.post('/upload-image', multer({ storage: storage }).single('image'), (req, res, next) => {
    const imageUrl = req.protocol + '://' // http://
        + req.get("host") // http://localhost:7979
        + "/images/" // http://localhost:7979/images/
        + req.file.filename; // http://localhost:7979/images/abc.jpg
    // if (req.file !== undefined || req.file) {
    res.status(201).json({
        message: 'Upload image successfuly',
        imageUrl: imageUrl
    });
    // }
});

/**
 * @name GET-tags
 * @author Thong
 * @param request
 * @description receive request from serverService
 * then call to fetch all tags from mongodb, send back response with message and data if successful
 */
app.get('/db/tags', (req, res, next) => {
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
app.get('/db/locations', (req, res, next) => {
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
app.get('/db/post-categories', (req, res, next) => {
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

app.post('/create-feedback', (req, res) => {

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

app.post('/create-search-history', (req, res) => {

    const searchHistory = req.body;

    if (searchHistory === undefined || searchHistory.keyword === undefined
        || searchHistory.keyword.trim() === '' || searchHistory.creationTime == null) {
        res.status(400).json({
            message: 'Invalid data!'
        });
    } else {
        database.insertOneToColection(database.iTravelDB.SearchHistory, searchHistory)
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
/** Routing - END */
