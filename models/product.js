const dynamoose = require('dynamoose');

const productSchema = new dynamoose.Schema({
    id: {
        type: String,
        required: true
    },
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

const Product = dynamoose.model("ecommerce-test-products", productSchema);
module.exports = Product;