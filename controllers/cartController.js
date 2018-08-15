const Cart = require('../models/cart.model');
const Product = require('../models/products.model');

exports.addToCart = (req, res) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findOne({_id : req.params.id}, (err, product) => {
        if (err) throw err;
        cart.add(product, product._id);
        req.session.cart = cart;
        res.send(cart);
    })
};

exports.getCart = (req, res) => {
    console.log(req.session.cart);
    if (!req.session.cart) {
        return res.sendStatus(400);
    }
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart);
    res.send(cart);
};



exports.deleteAllFromCart = (req, res) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findOne({_id : req.params.id}, (err, product) => {
        if (err) throw err;
        cart.removeAll(product._id);
        req.session.cart = cart;
        res.send(cart);
    })
};

exports.deleteOneFromCart = (req, res) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findOne({_id : req.params.id}, (err, product) => {
        if (err) throw err;
        cart.removeOne(product._id);
        req.session.cart = cart;
        res.send(cart);
    })
};

exports.eraseCart = (req, res) => {
    var cart = new Cart({});
    req.session.cart = cart;
    res.send(cart);
};