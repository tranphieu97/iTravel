var MongoClient = require('mongodb').MongoClient;
var config = require('../_config');
var database = require('../app/database');
var Q = require('q');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 3;

exports = module.exports = {};

/**
 * Hash a normal password to special string for save to database
 * @param {string} password 
 */
exports.hashPassword = async (password) => {
    var deferred = Q.defer();

    bcrypt.hash(password, saltRounds, function (err, hash) {
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
    var deferred = Q.defer();

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

/**
 * @author Thong
 * @description check a token is valid or not
 * @param token
 * @param userId optional - used to compare with id in token
 * @returns true or false
 */
exports.isValidToken = (token, userId = '') => {
    let tokenUserId = '';
    if (token) {
        token = token.split(' ')[1];
    } else { return false }
    // decode and validate token
    if (!token) {
        console.log('Token can not be null or undefined');
        return false;
    } else {
        // validate tokenUserId in token
        const tokenData = jwt.verify(token, config.SECRET_KEY);
        tokenUserId = tokenData._id;
        // if has userId input, check tokenUserId===userId
        if (userId) {
            if (userId === tokenUserId) return true;
            else return false;
        } else if (tokenUserId.length !== 24) {
            console.log('Invalid user in token');
            return false;
        }
        return true;
    }
}

/**
 * Check an user is admin
 * @name isAdminUser
 * @author phieu-th
 * @param {string} username
 * @returns {boolean} true if username is an admin
 */
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
                        if (result && result.permission === config.USER_PERMISSION.ADMIN) {
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
 * Check a request to api is included a specified permission in params
 * @name isSpecifiedPermissionRequest
 * @author phieu-th
 * @param {any} req request
 * @param {string} permission specified permission
 * @returns {boolean} true if request inclued permission
 */
exports.isSpecifiedPermissionRequest = async (req, permission) => {
    var deferred = Q.defer();
    let token = req.headers.authorization;

    if (token !== undefined) {
        token = token.split(' ')[1];
    }

    if (token === undefined || token === null || permission === undefined) {
        deferred.resolve(false);
    } else {
        try {
            const tokenData = jwt.verify(token, config.SECRET_KEY);

            if (tokenData.username === undefined || tokenData.exp < Date.now().valueOf / 1000) {
                deferred.resolve(false);
            } else {
                const userFilter = {
                    username: {
                        $eq: tokenData.username
                    },
                    permission: {
                        $elemMatch: {
                            $eq: permission
                        }
                    }
                };
    
                database.getOneFromCollection(database.iTravelDB.Users, userFilter)
                    .then((userInfo) => {
                        if (userInfo === null) {
                            deferred.resolve(false);
                        }
                        else {
                            deferred.resolve(true);
                        }
                    });
            }
        }
        catch
        {
            deferred.resolve(false);
        }
    }
    return deferred.promise;
}