var Cart = require('../models/cart.model');
// var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
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


exports.addToCart = (req, res) => {
    var newId = new mongodb.ObjectID(req.params.id);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    db.collection('productmodels').findOne({_id : newId}, (err, product) => {
        if (err) throw err;
        cart.add(product, product._id);
        req.session.cart = cart;
        res.send(cart);
    })

    // var product = products.filter(function(item) {
    //     return item.id == productId;
    // });
    // cart.add(product[0], productId);
    // req.session.cart = cart;
    // res.send(cart);
};

exports.getCart = (req, res) => {
    console.log(req.session.cart);
    if (!req.session.cart) {
        return res.sendStatus(400);
    }
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart);
    res.send(cart);
};



exports.deleteAllFromCart = (req, res) => {
    var newId = new mongodb.ObjectID(req.params.id);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    db.collection('productmodels').findOne({_id : newId}, (err, product) => {
        if (err) throw err;
        cart.removeAll(newId);
        req.session.cart = cart;
        res.send(cart);
    })
};

exports.deleteOneFromCart = (req, res) => {
    var newId = new mongodb.ObjectID(req.params.id);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    db.collection('productmodels').findOne({_id : newId}, (err, product) => {
        if (err) throw err;
        cart.removeOne(newId);
        req.session.cart = cart;
        res.send(cart);
    })
};

exports.eraseCart = (req, res) => {
    var cart = new Cart({});
    req.session.cart = cart;
    res.send(cart);
}