const config = require('../config/config');
const MongoClient = require('mongodb').MongoClient;

let db;

const dbURI = "mongodb://" +
    encodeURIComponent(config.db.username) + ":" +
    encodeURIComponent(config.db.password) + "@" +
    config.db.host + ":" +
    config.db.port + "/" +
    config.db.name;


    exports=MongoClient.connect(dbURI, (err, database) => {
        if (err) {
            console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
            process.exit(1);
        }
        console.log(database.db);
        return db = database.db('shop');
    });


