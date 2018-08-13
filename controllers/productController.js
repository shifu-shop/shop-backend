
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('../config/index');

const Product = require('../models/products.model');

/**
 * NodeJS Module dependencies.
 */
const { Readable } = require('stream');

/**
 * Create Express server && Routes configuration.
 */



/**
 * Connect Mongo Driver to MongoDB.
 */




let db;

const dbURI = "mongodb://" +
    encodeURIComponent(config.db.username) + ":" +
    encodeURIComponent(config.db.password) + "@" +
    config.db.host + ":" +
    config.db.port + "/" +
    config.db.name;

MongoClient.connect(dbURI, (err, database) => {
    if (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    }
    console.log(database.db);
    db = database.db('shop');
});

exports.getProduct = (req, res) => {
    let newId = new mongodb.ObjectID(req.params.id);
    db.collection('productmodels').findOne({_id: newId}, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
};

exports.postProduct = (req, res) => {
    let newItem = new Product;

    newItem.title = req.body.title;
    newItem.category = req.body.category;
    newItem.description = req.body.description;
    newItem.price = req.body.price;

    newItem.save((err) => {
        if (err) throw err;

        res.status(200).json('Success!')
    })
};

exports.deleteProduct = (req, res) => {
    let newId = new mongodb.ObjectID(req.params.id);
    db.collection('productmodels').findOneAndDelete({_id : newId}, (err) => {
        if (err) throw err;
        res.sendStatus(200);
    })
};

//Отрефакторить

// exports.getAllProducts = (req, res) => {
//     let productId = "5b714f918edfc352e9bd038d";
//     let newId = new mongodb.ObjectID(productId);
//     db.collection('productmodels').find({_id : newId}).toArray((err, products) => {
//         if (err) throw err;
//         console.log(products);
//         res.send(products);
//     })
// };

exports.getAllProducts = (req, res) => {
    db.collection('productmodels').find().toArray((err, products) => {
        if (err) throw err;
        res.send(products);
    })
};

