const productController = require('../controllers/productController');
const imageController = require('../controllers/imageController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const otherController = require('../controllers/otherController');

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
    app.get('/product/:id', productController.getProduct);
    app.post('/product', productController.postProduct);
    app.delete('/product/:id', productController.deleteProduct);
    app.get('/getcount', productController.getCount);

    //CRUD cart
    app.get('/cart', cartController.getCart);
    app.post('/cart/:id', cartController.addToCart);
    app.put('/cart/:id', cartController.deleteOneFromCart);
    app.delete('/cart/:id', cartController.deleteAllFromCart);
    app.delete('/cart', cartController.eraseCart);

    //CRUD order
    app.post('/order', orderController.create);
    app.get('/order', orderController.getAll);
    app.get('/order/:id', orderController.getOne);
    app.delete('/order/:id', orderController.deleteOne);

    //Other routes
    app.post('/search', otherController.search);

};
