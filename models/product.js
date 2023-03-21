const {default: mongoose } = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    minPurchasableQuantity: {
        type: Number,
        required: true
    },
    maxPurchasableQuantity: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model("product", productSchema);
module.exports = Product;