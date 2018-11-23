
var MongoClient = require('mongodb').MongoClient;
var config = require('../_config');
var Q = require('q');

exports = module.exports = {};

const iTravelDB = {
    Provinces: 'Provinces',
    Menu: 'Menu',
    Feedback: 'Feedback',
    Posts: 'Posts',
    SearchHistory: 'SearchHistory',
    Tags: 'Tags',
    PostCategories: 'PostCategories',
    ProvinceCity: 'ProvinceCity',
    Locations: 'Locations'
}

exports.iTravelDB = iTravelDB;

/**
 * Get a collection by it's name
 * @author phieu-th
 * @async
 * @param {string} collectionName 
 */
exports.getCollection = async function (collectionName) {
    var deferred = Q.defer();
    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {
            var db = client.db(config.DB_NAME);

            var collection = db.collection(collectionName);

            deferred.resolve(collection);
        }
    });
    return deferred.promise;
}

/**
 * Get all documents in a collection in db
 * @author phieu-th
 * @async
 * @param {string} collectionName 
 */
exports.getCollectionData = async (collectionName) => {
    var deferred = Q.defer();
    var data = null;

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {

            var db = client.db(config.DB_NAME);

            var collection = db.collection(collectionName, (err, collection) => {
                if (err) {
                    console.log('Error load ' + collectionName);
                    return null;
                }

                var collectionData = collection.find().toArray((err, result) => {
                    if (err) {
                        console.log('Error find data from collection ' + collectionName);
                        return null;
                    } else {
                        data = result;
                        deferred.resolve(data);
                    }
                });
            });

            client.close();
        }
    });

    return deferred.promise;
}

/**
 * Insert a document to a colection by colection name
 * @author phieu-th
 * @async
 * @param {string} collectionName 
 * @param {object} document 
 */
exports.insertOneToColection = async (collectionName, document) => {
    var deferred = Q.defer();

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {

            var db = client.db(config.DB_NAME);

            var collection = db.collection(collectionName, (err, collection) => {
                if (err) {
                    console.log('Error load ' + collectionName);
                    return null;
                }

                try {
                    var insertOne = collection.insertOne(document, (err) => {
                        if (err) {
                            console.log('Error insert data to ' + collectionName);
                            return null;
                        }
                        return 1;
                    });
                    deferred.reject(insertOne);
                }
                catch (e) {
                    console.log('Error insert data to ' + collectionName);
                    console.log(e.message);
                    deferred.reject(new Error(e.message));
                }
            });

            client.close();
        }
    });
}
