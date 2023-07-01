const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order-controller');
const Authorization = require('../middleware/auth');

router.post('/placeOrder', Authorization.authenticate, orderController.placeOrder);
router.post('/updateTransactionStatus', Authorization.authenticate, orderController.updateTransactionStatus);
router.post('/paymentFailed', Authorization.authenticate, orderController.paymentFailed);

module.exports = router;