// Include js file
const database = require('../database.js');
const config = require('../../_config.js');

// Get app instance from index
const app = require('../../index');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cback) => {
        // check file type is valid
        const isValid = config.MINE_TYPE_MAP[file.mimetype];
        let err = new Error('Invalid mine type');
        if (isValid) {
            err = null;
        }
        cback(err, 'images');
        // cback(err, 'server/images');
    },
    filename: (req, file, cback) => {
        // remove space and replace by '-'
        const name = file.originalname.toLowerCase().trim().split(' ').join('-');
        const ext = config.MINE_TYPE_MAP[file.mimetype];
        cback(null, name + '-' + Date.now() + '.' + ext);
    }
});

// Routing - START
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
// Routing - END

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, 'angular', 'index.html'));
// });