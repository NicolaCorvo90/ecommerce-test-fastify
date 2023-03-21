const { default: mongoose } = require('mongoose')
const User = require('../models/user');

const userRepository = {
    findAll: () => {
        return User.find();
    },
    findById: (id) => {
        if(id) {
            return User.findById({_id: id});
        } else {
            throw new Error("Id not provided");
        }
    },
    findByUsername: (username) => {
        if(username) {
            return User.findOne({username: username});
        } else {
            throw new Error("Username not provided");
        }
    },
    save: (user) => {
        if(user) {
            var user = new User({
                username: user.username,
                password: user.password,
                isAdmin: user.isAdmin
            })
            return user.save();
        } else {
            throw new Error("Invalid user");
        }
    },
    update: (id, user) => {
        if(!id) {
            throw new Error("Empty id");
        }
        if(user) {
            var username = user.username;
            var password = user.password;
            var isAdmin = user.isAdmin;
            var cart = user.cart;
            return User.findByIdAndUpdate({_id: id}, {username, password, isAdmin, cart});
        } else {
            throw new Error("Invalid user");
        }
    },
    delete: (id) => {
        if(!id) {
            throw new Error("Empty id");
        } else {
            return User.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        }
    }
  }
  
  module.exports = userRepository;