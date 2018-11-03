
var MongoClient = require('mongodb').MongoClient;
var config = require('../_config');
var Q = require('q');

exports = module.exports = {};


exports.GetCollection = async function(collectionName) {
    var deferred = Q.defer();
    MongoClient.connect(config.CONNECTION_STRING, (err, client) => {
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
