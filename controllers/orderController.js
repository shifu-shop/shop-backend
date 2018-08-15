const Order = require('../models/order.model');

exports.create = (req, res) => {
    let newOrder = new Order;
    newOrder.cart = req.session.cart;
    newOrder.email = req.body.email;
    newOrder.name = req.body.name;

    newOrder.save((err) => {
        if (err) throw err;
        res.sendStatus(200);
    })
};

exports.getAll = (req, res) => {
    Order.find((err, result) => {
        if (err) throw err;
        res.send(result);
    })
};

exports.getOne = (req, res) => {
    let id = req.params.id;
    Order.findOne({_id: id}, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
};

exports.deleteOne = (req, res) => {
    let id = req.params.id;
    Order.findOneAndRemove({_id: id}, (err) => {
        if(err) throw err;
        res.sendStatus(200);
    })
}