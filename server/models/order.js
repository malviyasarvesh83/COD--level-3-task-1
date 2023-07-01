const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;