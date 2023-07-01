const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user');
const Cart = require('../models/cart');
const dotenv = require('dotenv').config();

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

exports.placeOrder = async (req, res) => {
    try {
        const { totalAmount } = req.body;
        const rzp = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        })
        const amount = totalAmount*100;
        rzp.orders.create({ amount, currency: 'INR' }, async (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            await Order.create({ orderId: order.id, status: 'PENDING', userId:req.user._id });
            return res.status(201).json({ order, key_id: rzp.key_id });
        })
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.updateTransactionStatus = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOneAndUpdate({ orderId: order_id }, { paymentId: payment_id, status: 'SUCCESSFUL' });
        const cart = await Cart.deleteMany({ userId: req.user._id });
        return res.status(202).json({ success: true, message: 'Transaction Successful' });
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.paymentFailed = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOneAndUpdate({ orderId: order_id }, { paymentId: payment_id, status: 'FAIL' });
        res.status(200).json({ success: false, message: 'Transcation Failed' });
    } catch (error) {
        res.status(400).json(error);
    }
}