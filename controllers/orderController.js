const Order = require('../models/order.model');
const config = require('../config/config');

var mailgun = require('mailgun-js')(config.mailgun);


exports.create = (req, res) => {
    let newOrder = new Order;
    newOrder.cart = req.session.cart;
    newOrder.email = req.body.email;
    newOrder.name = req.body.name;

    newOrder.save((err) => {
        if (err) throw err;
        res.sendStatus(200);

        var data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: newOrder.email,
            subject: 'Hello',
            text: 'Testing some Mailgun awesomeness!'
        };
        mailgun.messages().send(data, function (error, body) {
            if (err) throw err;
            console.log(data);
            console.log("Its OK");
            console.log(body);
        });
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
};