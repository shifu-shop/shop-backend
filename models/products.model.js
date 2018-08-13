const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    imageId: {type: String},
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('ProductModel', productSchema);