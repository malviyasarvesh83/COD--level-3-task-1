const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controller');
const Authorization = require('../middleware/auth');

router.get('/cart', Authorization.authenticate, cartController.getCart);
router.delete('/removeCartItem/:id', Authorization.authenticate, cartController.removeCartItem);

module.exports = router;