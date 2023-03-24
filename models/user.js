const dynamoose = require('dynamoose');

const userSchema = new dynamoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
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

const User = dynamoose.model("ecommerce-test-users", userSchema);
module.exports = User;