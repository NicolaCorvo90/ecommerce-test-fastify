const dynamoose = require('dynamoose');

const orderSchema = new dynamoose.Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    products:{
        type: Array,
        schema: [{
            type: Object,
            schema: {
                productId: String,
                quantity: Number
            }
        }]
    } 
})

const Order = dynamoose.model("ecommerce-test-orders", orderSchema);
module.exports = Order;