const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required:true,
    }
})

const TopProduct = mongoose.model('TopProduct', productSchema);

module.exports = TopProduct;