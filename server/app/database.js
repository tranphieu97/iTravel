
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
    Locations: 'Locations',
    Users: 'Users',
    SignInHistory: 'SignInHistory',
    Policies: 'Policies',
    Notifications: 'Notifications',
    Log_PermissionManagement: 'Log_PermissionManagement'
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
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName);

                deferred.resolve(collection);
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
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
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName, (err, collection) => {
                    if (err) {
                        console.log('Error load ' + collectionName);
                        deferred.reject(new Error(err));
                    }

                    var collectionData = collection.find().toArray((err, result) => {
                        if (err) {
                            console.log('Error find data from collection ' + collectionName);
                            deferred.reject(new Error(err));
                        } else {
                            data = result;
                            deferred.resolve(data);
                        }
                    });
                });
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
        }
    });

    return deferred.promise;
}

/**
 * Get data in a collection have filter
 * @param {string} collectionName 
 * @param {object} filter 
 */
exports.getCollectionFilterData = async (collectionName, filter) => {
    var deferred = Q.defer();
    var data = null;

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName, (err, collection) => {
                    if (err) {
                        console.log('Error load ' + collectionName);
                        deferred.reject(new Error(err));
                    }

                    var collectionData = collection.find(filter).toArray((err, result) => {
                        if (err) {
                            console.log('Error find filter data from collection ' + collectionName);
                            deferred.reject(new Error(err));
                        } else {
                            data = result;
                            deferred.resolve(data);
                        }
                    });
                });
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
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
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName, (err, collection) => {
                    if (err) {
                        console.log('Error load ' + collectionName);
                        deferred.reject(new Error(err));
                    }

                    try {
                        var insertOne = collection.insertOne(document, (err) => {
                            if (err) {
                                console.log('Error insert data to ' + collectionName);
                                deferred.reject(new Error(err));
                            }
                            return 1;
                        });
                        deferred.reject(insertOne);
                    }
                    catch (e) {
                        console.log('Error insert data to ' + collectionName);
                        console.log(e.message);
                        deferred.reject(new Error(e));
                    }
                });
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
        }
    });
    return deferred.promise;
}

/**
 * Get only one document match with filter
 * @name getOneFromCollection
 * @author phieu-th
 * @async
 * @param {string} collectionName 
 * @param {object} filter 
 */
exports.getOneFromCollection = async (collectionName, filter) => {
    var deferred = Q.defer();
    var data = null;

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName, (err, collection) => {
                    if (err) {
                        console.log('Error load ' + collectionName);
                        return null;
                    }

                    var collectionData = collection.findOne(filter, (err, result) => {
                        if (err) {
                            console.log('Error find filter data from collection ' + collectionName);
                            return null;
                        } else {
                            data = result;
                            deferred.resolve(data);
                        }
                    });
                });
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
        }
    });

    return deferred.promise;
}

/**
 * Update only one document be chosen by filter with new properties
 * @name updateDocumentByFilter
 * @async
 * @author phieu-th
 * @param {string} collectionName 
 * @param {object} documentFiler 
 * @param {object} changeProperties 
 */
exports.updateDocumentByFilter = async (collectionName, documentFiler, changeProperties) => {
    var deferred = Q.defer();

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName, (err, collection) => {
                    if (err) {
                        console.log('Error load ' + collectionName);
                        return deferred.reject(new Error(err));;
                    }

                    try {
                        collection.updateOne(documentFiler, { $set: changeProperties })
                            .then((result) => {
                                deferred.resolve(result);
                            })
                    }
                    catch (e) {
                        console.log('Error update ' + documentFiler + 'data to ' + collectionName);
                        console.log(e.message);
                        deferred.reject(new Error(e));
                    }
                });
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
        }
    });

    return deferred.promise;
}

/**
 * @name replaceDocumentById
 * @author Thong
 * @description replace a document by new one, keep the same id
 * @param {string} collectionName
 * @param {object} documentFiler the object filter use to find the old document need replace
 * @param {Post} changeDocument new document use to replace the old one
 */
exports.replaceDocumentById = async (collectionName, documentFiler, changeDocument) => {
    var deferred = Q.defer();

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName, (err, collection) => {
                    if (err) {
                        console.log('Error load ' + collectionName);
                        return deferred.reject(new Error(err));;
                    }

                    try {
                        collection.replaceOne(documentFiler, changeDocument)
                            .then((result) => {
                                deferred.resolve(result);
                            })
                    }
                    catch (e) {
                        console.log('Error replay ' + 'data to ' + collectionName);
                        console.log(e.message);
                        deferred.reject(new Error(e));
                    }
                });
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
        }
    });

    return deferred.promise;
}

/**
 * @name getOneWithProjection
 * @author Thong
 * @description get one document of a collection, user filter to find document, 
 * use projection to filtout collumns do not need
 * @param {string} collectionName
 * @param {object} filter the object filter use to find the true document
 * @param {object} projectionObj use to choose collumns to return
 */
exports.getOneWithProjection = async (collectionName, filter, projectionObj) => {
    var deferred = Q.defer();
    var data = null;

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName, (err, collection) => {
                    if (err) {
                        console.log('Error load ' + collectionName);
                        return null;
                    }

                    var collectionData = collection.findOne(filter, projectionObj, (err, result) => {
                        if (err) {
                            console.log('Error find filter data from collection ' + collectionName);
                            return null;
                        } else {
                            data = result;
                            deferred.resolve(data);
                        }
                    });
                });
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
        }
    });

    return deferred.promise;
}

/**
 * Get number of document match with filter
 * @name countDocumentByFilter
 * @author phieu-th
 * @param {sting} collectionName 
 * @param {object} filter 
 */
exports.countDocumentByFilter = async (collectionName, filter) => {
    var deferred = Q.defer();

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName, (err, collection) => {
                    if (err) {
                        console.log('Error load ' + collectionName);
                        return null;
                    }

                    if (filter !== undefined && filter !== null) {
                        collection.countDocuments(filter, (err, result) => {
                            if (err) {
                                console.log('Error find count document from collection ' + collectionName);
                                deferred.reject(new Error(err));
                            } else {
                                deferred.resolve(result);
                            }
                        });
                    } else {
                        collection.countDocuments((err, result) => {
                            if (err) {
                                console.log('Error find count document from collection ' + collectionName);
                                deferred.reject(new Error(err));
                            } else {
                                deferred.resolve(result);
                            }
                        });
                    }
                });
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
        }
    });

    return deferred.promise;
}

exports.getCollectionDataByProjection = async (collectionName, filter, project) => {
    var deferred = Q.defer();
    var data = null;

    MongoClient.connect(config.CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("Get Connection has an error: " + err.message);
            deferred.reject(new Error(err));
        } else {
            try {
                var db = client.db(config.DB_NAME);

                var collection = db.collection(collectionName, (err, collection) => {
                    if (err) {
                        console.log('Error load ' + collectionName);
                        deferred.reject(new Error(err));
                    }

                    var collectionData = collection.find(filter).project(project).toArray((err, result) => {
                        if (err) {
                            console.log('Error find filter data from collection ' + collectionName);
                            deferred.reject(new Error(err));
                        } else {
                            data = result;
                            deferred.resolve(data);
                        }
                    });
                });
            } catch (err) {
                console.error(err);
                deferred.reject(new Error(err));
            } finally {
                client.close();
            }
        }
    });

    return deferred.promise;
}