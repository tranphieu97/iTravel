// Include js file
const config = require('../_config');
const database = require('./database.js');
const authetication = require('./authentication.js');

var ObjectId = require('mongodb').ObjectId;

exports = module.exports = {};

exports.countViewPost = async (postId) => {
    const idFilter = {
        "_id": new ObjectId(postId)
    };
    database.getOneFromCollection(database.iTravelDB.Posts, idFilter)
        .then((result) => {
            if (result) {
                currentViewAmount = result.viewAmount;

                if (currentViewAmount >= 0) {
                    currentViewAmount++;

                    const updateViewAmount = {
                        "viewAmount": currentViewAmount,
                    };
                    database.updateDocumentByFilter(database.iTravelDB.Posts, idFilter, updateViewAmount)
                        .then()
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        });
}