const {default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
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
    cart:   [
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

const User = mongoose.model("user", userSchema);
module.exports = User;