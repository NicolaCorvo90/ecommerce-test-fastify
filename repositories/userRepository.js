const uuid = require('uuid');
const User = require('../models/user');

const userRepository = {
    findAll: async () => {
        return await User.scan().exec();
    },
    findById: async (id) => {
        if(id) {
            return await User.get(id);
        } else {
            throw new Error("Id not provided");
        }
    },
    findByUsername: async (username) => {
        if(username) {
            var user = await User.scan("username").contains(username).exec();
            if(user.count == 0) {
                return false;
            } else {
                return user[0];
            }
        } else {
            throw new Error("Username not provided");
        }
    },
    save: async (user) => {
        if(user) {
            var user = new User({
                id: uuid.v4(),
                username: user.username,
                password: user.password,
                isAdmin: user.isAdmin
            });

            return await user.save();
        } else {
            throw new Error("Invalid user");
        }
    },
    update: async (id, user) => {
        if(!id) {
            throw new Error("Empty id");
        }
        if(user) {
            var oldRecord = await User.get(id);
            
            var toSave = new User({
                id: oldRecord.id,
                username: oldRecord.username,
                password: oldRecord.password,
                isAdmin: oldRecord.isAdmin,
                cart: oldRecord.cart
            });

            if(user.username) {
                toSave.username = user.username;
            }
            if(user.password) {
                toSave.password = user.password;
            }
            if(user.isAdmin) {
                toSave.isAdmin = user.isAdmin;
            }
            if(user.cart) {
                toSave.cart = user.cart;
            }

            return await toSave.save();
        } else {
            throw new Error("Invalid user");
        }
    },
    delete: async (id) => {
        if(!id) {
            throw new Error("Empty id");
        } else {
            return await User.delete(id);
        }
    }
  }
  
  module.exports = userRepository;