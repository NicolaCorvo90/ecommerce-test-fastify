const uuid = require('uuid');
const UserCart = require('../models/userCart');

const userCartRepository = {
    findAll: async () => {
        return await UserCart.scan().exec();
    },
    findById: async (userId) => {
        if(userId) {
            return await UserCart.get(userId);
        } else {
            throw new Error("userId not provided");
        }
    },
    save: async (userCartInput) => {
        if(userCartInput) {
            var userCart = new UserCart({
                userId: userCartInput.userId,
                cart: userCartInput.cart
            });
            return await userCart.save();
        } else {
            throw new Error("Invalid userCartInput");
        }
    },
    update: async (userId, userCartInput) => {
        if(!userId) {
            throw new Error("Empty userId");
        }
        if(userCartInput) {
            var oldRecord = await UserCart.get(userId);
            
            var toSave = new UserCart({
                userId: oldRecord.userId,
                cart: oldRecord.cart
            });

            if(userCartInput.cart) {
                toSave.cart = userCartInput.cart;
            }

            return await toSave.save();
        } else {
            throw new Error("Invalid userCartInput");
        }
    },
    delete: async (id) => {
        if(!id) {
            throw new Error("Empty id");
        } else {
            return await UserCart.delete(id);
        }
    }
  }
  
  module.exports = userCartRepository;