const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

let orderSchema = new Schema({
    number: {type: Number},
    date: { type: Date, default: Date.now },
    name: {type: String},
    email: {type: String},
    cart: {type: Object}
});

orderSchema.plugin(AutoIncrement, {inc_field: 'number'});
module.exports = mongoose.model('OrderModel', orderSchema);