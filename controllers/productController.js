const Product = require('../models/products.model');
const url = require('url');

exports.getProduct = (req, res) => {
    Product.findOne({_id: req.params.id}, (err, result) => {
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
    Product.findOneAndDelete({_id : req.params.id}, (err) => {
        if (err) throw err;
        res.sendStatus(200);
    })
};


exports.getAllProducts = (req, res) => {
    let limit = 0;
    let offset = 0;
    let urlVal = url.parse(req.url, true);

    if (urlVal.query.value) {
        limit = Number(urlVal.query.value);
    }

    if (urlVal.query.offset) {
        offset = Number(urlVal.query.offset)
    }
    Product.find().skip(offset).limit(limit).exec((err, products) => {
    // Product.find((err, products) => {
        if (err) throw err;
        res.send(products);
    })
};

exports.getCount = (req, res) => {
  Product.find().exec((err, products) => {
      if (err) throw err;
      res.send(String(products.length));
  })
};

