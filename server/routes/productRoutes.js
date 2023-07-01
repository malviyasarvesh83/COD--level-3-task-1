const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const Authorization = require('../middleware/auth');

router.get('/topProduct', Authorization.authenticate, productController.topProducts);
router.get('/Product', productController.Products);
router.get('/getProductById/:id', Authorization.authenticate, productController.getProductById);
router.post('/addToCart', Authorization.authenticate, productController.addToCart);

module.exports = router;