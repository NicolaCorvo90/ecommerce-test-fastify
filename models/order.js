const {default: mongoose } = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    products:  
    [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            quantity: {
                type: Number,
                require: true
            }
        }
    ]
    
})

const Order = mongoose.model("order", orderSchema);
module.exports = Order;