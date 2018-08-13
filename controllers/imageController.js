
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let db;
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


exports.getAllImage = (req, res) => {
    db.collection('images.files').find().toArray((err, results) => {
        if (err) throw err;
        res.send(results);
    })
};

exports.deleteImage = (req, res) => {
    let newId = new mongodb.ObjectID(req.params.imageID);
    db.collection('images.files').findOneAndDelete({_id : newId}, (err) => {
        if (err) throw err;
        res.sendStatus(200);
    })
};

/**
 * GET image by ID Route
 */
exports.getImage = (req, res) => {
    let imageID;
    try {
        imageID = new ObjectID(req.params.imageID);
    } catch (err) {
        return res.status(400).json({message: "Invalid PhotoID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters"});
    }

    let bucket = new mongodb.GridFSBucket(db, {
        bucketName: 'images'
    });

    let downloadStream = bucket.openDownloadStream(imageID);

    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });
};

/**
 * POST photo Route
 */
exports.postImage = (req, res) => {
    upload.single('image')(req, res, (err) => {
        console.log(req.file);
        console.log(req.image);
        if (err) {
            return res.status(400).json({message: "Upload Request Validation Failed"});
        } else if (!req.body.productId) {
            return res.status(400).json({message: "No image name in request body"});
        }

        let productId = req.body.productId;

        // Covert buffer to Readable Stream
        const readablePhotoStream = new Readable();
        readablePhotoStream.push(req.file.buffer);
        readablePhotoStream.push(null);

        let bucket = new mongodb.GridFSBucket(db, {
            bucketName: 'images'
        });

        let uploadStream = bucket.openUploadStream(productId);
        let id = uploadStream.id;
        readablePhotoStream.pipe(uploadStream);

        uploadStream.on('error', () => {
            return res.status(500).json({message: "Error uploading file"});
        });

        uploadStream.on('finish', () => {
            // return res.status(201).json({message: "File uploaded successfully, stored under Mongo ObjectID: " + id});
            console.log("Its OK");
            let newId = new mongodb.ObjectID(productId);
            db.collection('productmodels').updateOne({_id : newId}, { $set: { imageID : id } }, (err, result) => {
                if (err) throw err;
                console.log('Very nice! ' + result);
                res.sendStatus(200);
            })
        });


    });
};

exports.postProductWithImage = (req, res) => {
    upload.single('image')(req, res, (err) => {
        console.log(req.file);
        console.log(req.image);
        console.log(req.body.productId);
        console.log(req.body.title);
        console.log(req.body.category);
        console.log(req.body.description);
        console.log(req.body.price);
        if (err) {
            return res.status(400).json({message: "Upload Request Validation Failed"});
        } else if (!req.body.productId) {
            return res.status(400).json({message: "No image name in request body"});
        }

        let productId = req.body.productId;

        // Covert buffer to Readable Stream
        const readablePhotoStream = new Readable();
        readablePhotoStream.push(req.file.buffer);
        readablePhotoStream.push(null);

        let bucket = new mongodb.GridFSBucket(db, {
            bucketName: 'images'
        });

        let uploadStream = bucket.openUploadStream(productId);
        let id = uploadStream.id;
        console.log(uploadStream);
        readablePhotoStream.pipe(uploadStream);

        uploadStream.on('error', () => {
            return res.status(500).json({message: "Error uploading file"});
        });

        uploadStream.on('finish', () => {
            // return res.status(201).json({message: "File uploaded successfully, stored under Mongo ObjectID: " + id});
            let newItem = new Product;

            console.log(req.body.title);
            console.log(req.body.category);
            console.log(req.body.description);
            console.log(req.body.price);

            newItem.title = req.body.title;
            newItem.category = req.body.category;
            newItem.description = req.body.description;
            newItem.price = req.body.price;

            newItem.save((err) => {
                if (err) throw err;

                res.status(200).json('Success!')
            })
        });


    });
};