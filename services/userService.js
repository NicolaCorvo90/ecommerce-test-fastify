const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const productRepository = require('../repositories/productRepository');
const jwtService = require('./jwtService');
const cartService = require('../services/cartService');

const userService = {
    findAll: () => {
        return userRepository.findAll();
    },
    findById: (id) => {
        if(!id) {
            throw new Error("Id not provided");
        }
        return userRepository.findById(id);
    },
    save: async (user) => {
        if(!user) {
            throw new Error("Empty user");
        }
        if(!user.username) {
            throw new Error("Username not specified");
        }
        if(!user.password) {
            throw new Error("Password not specified");
        }
        if(await userRepository.findByUsername(user.username)) {
            throw new Error("Duplicated username");
        }
        
        user.password = await bcrypt.hash(user.password, 12);
        
        return userRepository.save(user);
    },
    update: async (id, user) => {
        if(!id) {
            throw new Error("Empty id");
        }
        if(!user.username && !user.password && !user.cart) {
            throw new Error("No field to update");
        }
        if(user.password) {
            user.password = await bcrypt.hash(user.password, 12);
        }

        return userRepository.update(id, user);
    },
    delete: (id) => {
        if(!id) {
            throw new Error("Id not provided");
        }
        
        return userRepository.delete(id);
    },
    searchUser: async (username, password) => {
        if(!username) {
            throw new Error("Empty username");
        }
        if(!password) {
            throw new Error("Empty password");
        }

        var user = null;
        try {
            user = await userRepository.findByUsername(username);
        } catch(error) {
            throw new Error("Error loading user");
        }

        if(!user) {
            throw new Error("User not found");
        }

        var hashPassword = null;
        try {
            hashPassword = await bcrypt.compare(password, user.password);
        } catch(error) {
            throw new Error("Error comparing passwords");
        }
        
        if(!hashPassword) {
            throw new Error("Invalid password");
        }

        if(!user.id) {
            throw new Error("Invalid user");
        }

        return user;
    },
    login: async (username, password) => {
        const user = this.searchUser(username, password);

        return jwtService.generateToken(user);
    },
    getUserFromToken: async (token) => {
        if(!token) {
            throw new Error("Empty token");
        }

        const { payload }  = jwtService.extractPayloadFromToken(token);

        var user = null;
        try {
            user = await userService.findById(payload.userid);
        } catch(error) {
            throw new Error("Error loading user from token");
        }

        return user;
    },
    addProductToCart: async (userId, productId, quantity) => {
        if(!userId) {
            throw new Error("Empty userId");
        }
        if(!productId) {
            throw new Error("Empty productId");
        }
        if(quantity && quantity < 1) {
            throw new Error("Invalid quantity param");
        }

        if(!quantity) {
            quantity = 1;
        }

        var user = null;
        try {
            user = await userService.findById(userId);
        } catch(error) {
            throw new Error("Error loading user");
        }

        var product = null;
        try {
            product = await productRepository.findById(productId);
        } catch(error) {
            throw new Error("Error loading product");
        }

        user.cart = cartService.addProductIdToCart(user.cart, productId, quantity);

        var toUpdate = {
            cart: user.cart
        }

        return module.exports.update(userId, toUpdate);
    },
    deleteCart: async (id) => {
        var user = await module.exports.findById(id);
        var toUpdate = {
            cart: []
        }
        module.exports.update(id, toUpdate);

    }
  }
  
module.exports = userService;

