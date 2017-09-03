const mongoDB_client = require('mongodb').MongoClient;
const DB_CONN_URL = 'mongodb://localhost:27017/umlink';


/**
 * TODO:insert Documents
 * @param db
 * @param dbName
 * @param data
 * @returns {Promise}
 */
const insertData = function (db, dbName, data) {
    return new Promise(function (resolve, reject) {
        //TODO connect db
        let collection = db.collection(dbName);
        //install data
        collection.insert(data, function (err, doc) {
            if (err) {
                reject(err)
            }
            resolve(doc)
        });
    })
};

/**
 * TODO:find all documents
 * @param db
 * @param dbName
 * @returns {Promise}
 */
const findAllDocuments = function (db, dbName) {
    return new Promise(function (resolve, reject) {
        //connect db
        let collection = db.collection(dbName);
        //TODO findAll data   tip: find()/find({}) all right
        collection.find().toArray(function (err, docs) {
            if (err) {
                reject(err)
            }
            resolve(docs)
        })
    })
};

/**
 * TODO:find document by condition
 * @param db
 * @param dbName
 * @param condition
 * @returns {Promise}
 * Tip:condition [One or more]
 */
const findDocByCondition = function (db, dbName, condition) {
    return new Promise(function (resolve, reject) {
        let collection = db.collection(dbName);
        collection.find(condition).toArray(function (err, docs) {
            if (err) {
                reject(err)
            }
            resolve(docs)
        })
    })
};

/**
 * TODO:update a document
 * @param db
 * @param dbName
 * @param condition
 * @param upData
 * @returns {Promise}
 */
const updateOneDoc = function (db, dbName, condition, upData) {
    return new Promise(function (resolve, reject) {
        let collection = db.collection(dbName);
        collection.updateOne(condition,
            {$set: upData}, function (err, docs) {
                if (err) {
                    reject(err)
                }
                resolve(docs)
            });
    })
};
/**
 * TODO:remove one doc by condition
 * @param db
 * @param dbName
 * @param condition
 * @returns {Promise}
 */
const removeOneDoc = function (db, dbName, condition) {
    return new Promise(function (resolve, reject) {
        let collection = db.collection(dbName);
        collection.deleteOne(condition, function (err, docs) {
            if (err) {
                reject(err)
            }
            resolve(docs)
        });
    })
};

/**
 * TODO:add index
 * @param db
 * @param dbName
 * @param condition
 * @returns {Promise}
 */
const addIndex = function (db, dbName, condition) {
    return new Promise(function (resolve, reject) {
        let collection = db.collection(dbName);
        //与createIndex相同，区别在于添加之前检索索引是否存在，以避免重复索引
        //condition：1.string、2.{name:1,...}(1:升，-1，降)、3.[["firstname", 1], ["lastname", 1]]
        collection.ensureIndex(condition,
            function (err, docs) {
                if (err) {
                    reject(err)
                }
                resolve(docs)
            });
    })
};

// connect mongodb
mongoDB_client.connect(DB_CONN_URL, function (err, db) {
    if (err) {
        console.info(err);
    } else {
        /*
         * let data = {
            _id: "insert_1",
            name: "flzhao",
            age: "24",
        };
        insertData(db, 'umlink', data)
            .then(doc => console.info(doc))
            .catch(err => console.info(err));*/

        findAllDocuments(db, 'umlink')
            .then(docs => {
                console.info(docs);
            }).catch(err => console.info(err));

        /*findDocByCondition(db, 'umlink', {_id: 'insert_3'})
            .then(doc => {
                console.info(doc);
            }).catch(err => console.info(err));*/

        /*updateOneDoc(db,'umlink',{_id: 'insert_4'},{name:"flzhao_4"})
            .then(result => {
                console.info(result.result);
            }).catch(err => console.info(err));*/

        /*removeOneDoc(db, 'umlink', {_id: 'insert_4'})
            .then(result => {
                console.info(result.result);
            }).catch(err => console.info(err));*/


        /*addIndex(db,'umlink',{name:5})
            .then(result => {
                console.info(result);
            }).catch(err => console.info(err));*/
        db.close();
    }

});