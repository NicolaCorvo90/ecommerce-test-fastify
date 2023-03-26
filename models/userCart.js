const dynamoose = require('dynamoose');

const userCartSchema = new dynamoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    cart:{
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

const UserCart = dynamoose.model("ecommerce-test-users-carts", userCartSchema);
module.exports = UserCart;