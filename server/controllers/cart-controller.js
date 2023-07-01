const Cart = require('../models/cart');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user._id });
        res.status(200).json({ cart, firstName: req.user.firstName, lastName: req.user.lastName, address: req.user });
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.removeCartItem = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await Cart.findById(id);
        await cart.deleteOne();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}