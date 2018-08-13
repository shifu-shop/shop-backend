const productController = require('../controllers/productController');
const imageController = require('../controllers/imageController');

module.exports = (app) => {

    //CRUD image
    app.get('/getallimages', imageController.getAllImage);
    app.get('/image/:imageID', imageController.getImage);
    app.post('/image', imageController.postImage);
    app.delete('/image/:imageID', imageController.deleteImage);
    // app.post('/productwithimage', imageController.postProductWithImage);

    // app.post('/productwithimage', productController.postProduct, productController.postImage);

    //CRUD product
    app.get('/getallproducts', productController.getAllProducts);
    app.get('./product/:id', productController.getProduct);
    app.post('/product', productController.postProduct);
    app.delete('/product/:id', productController.deleteProduct);
};
