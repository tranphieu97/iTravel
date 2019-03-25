

var MongoClient = require('mongodb').MongoClient;
var config = require('../_config');
var database = require('../app/database');
var Q = require('q');
const bcrypt = require('bcryptjs');
const saltRounds = 3;

exports = module.exports = {};

/**
 * Hash a normal password to special string for save to database
 * @param {string} password 
 */
exports.hashPassword = async (password) => {
    var deferred = Q.defer();

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(hash);
        }
    });
    
    return deferred.promise;
}

/**
 * Compare input password match with a hash password
 * @name comparePassword
 * @author phieu-th
 */
exports.comparePassword = async (password, hashPassword) => {
    var deferred = Q.defer();

    bcrypt.compare(password, hashPassword, (err, result) => {
        if (err) {
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}

/**
 * Check an username existed in DB collection Users 
 * @author phieu-th
 * @async
 * @param {string} username 
 */
exports.isExistUsername = async (username) => {
    var deferred = Q.defer();

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {

            var db = client.db(config.DB_NAME);

            collection = db.collection(database.iTravelDB.Users, (err, userCollection) => {
                var find = userCollection.findOne({ username: { $eq: username } }, (err, result) => {
                    if (err) {
                        deferred.resolve(false);
                    } else {
                        if (result) {
                            deferred.resolve(true);
                        }
                        deferred.resolve(false);
                    }
                });
            })
        }
        
        client.close();
    });

    return deferred.promise;
}

/**
 * Save log user Sign In to system. This funtion don't need to return
 * @name insertUserSignInLog
 * @author phieu-th
 * @param {string} username 
 */
exports.insertUserSignInLog = async (username) => {

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {

            var db = client.db(config.DB_NAME);

            collection = db.collection(database.iTravelDB.SignInHistory, (err, signInHistoryCollection) => {
                var dateTimeSignIn = new Date()
                var signInLog = {
                    username: username,
                    creationTime: dateTimeSignIn
                }

                signInHistoryCollection.insertOne(signInLog);
            })
        }
        
        client.close();
    });
};

exports.isAdminUser = async (username) => {
    var deferred = Q.defer();

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {

            var db = client.db(config.DB_NAME);

            collection = db.collection(database.iTravelDB.Users, (err, userCollection) => {
                var find = userCollection.findOne({ username: { $eq: username } }, (err, result) => {
                    if (err) {
                        deferred.resolve(false);
                    } else {
                        if (result && result.permission === config.USER_PERMISSION.Admin) {
                            deferred.resolve(true);
                        }
                        deferred.resolve(false);
                    }
                });
            })
        }
        
        client.close();
    });

    return deferred.promise;
}