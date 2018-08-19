const Product = require('../models/products.model');

exports.search = async (req, res) => {
    let charsToFind = req.body.str;
    let regexpToFind = new RegExp(charsToFind, 'i');
    console.log(regexpToFind);
    let results = await Product.find({'title' : regexpToFind});
    res.send(results);
};