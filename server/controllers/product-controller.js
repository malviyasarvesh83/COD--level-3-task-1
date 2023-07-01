const TopProduct = require('../models/topProduct');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.topProducts = async (req, res) => {
    try {
        const cart = await Cart.countDocuments({ userId: req.user._id });
        const topProduct = await TopProduct.find();
        res.status(200).json({ topProduct, firstName: req.user.firstName, lastName: req.user.lastName, cart });
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.Products = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await Cart.countDocuments({ userId: req.user._id });
        const product = await Product.find({ id: id });
        res.status(200).json({ product, firstName: req.user.firstName, lastName: req.user.lastName, cart });
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.addToCart = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findOne({ id: id });
        const cart = await Cart.create({
            id: product.id,
            url: product.url,
            title: {
                shortTitle: product.title.shortTitle,
                longTitle: product.title.longTitle,
            },
            price: {
                mrp: product.price.mrp,
                cost: product.price.cost,
                discount: product.price.discount,
            },
            quantity: 1,
            description: product.description,
            discount: product.discount,
            tagline: product.tagline,
            userId: req.user._id,
        });
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json(error.message);
    }
}