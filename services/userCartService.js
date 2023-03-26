const userCartRepository = require('../repositories/userCartRepository');
const productRepository = require('../repositories/productRepository');

const userCartService = {
    findAll: () => {
        return userCartRepository.findAll();
    },
    findById: (id) => {
        if(!id) {
            throw new Error("Id not provided");
        }
        return userCartRepository.findById(id);
    },
    delete: (id) => {
        if(!id) {
            throw new Error("Id not provided");
        }
        
        return userCartRepository.delete(id);
    },
    addProduct: async (userId, productId, quantity) => {
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

        var insert = false;
        
        var userCart = await userCartService.findById(userId);

        if(!userCart) {
            insert = true;
            userCart = {
                userId: userId,
                cart: []
            }
        }

        await productRepository.findById(productId);

        userCart.cart = module.exports.addProductIdToCart(userCart.cart, productId, quantity);

        try {
            if(insert) {
                await userCartRepository.save(userCart);
            } else {
                await userCartRepository.update(userCart.userId, userCart);
            }
        } catch(error) {
            throw new Error("Error updating cart");
        }

        return { result: true, insert: insert};
    },
    findProductIdIndexInCart: (cart, productId) => {
        return cart.findIndex(element => element.productId.toString() == productId);
    },
    addProductIdToCart: (cart, productId, quantity = 1) => {
        if(!cart) {
            cart = [];
        }
        var productInCartIndex = module.exports.findProductIdIndexInCart(cart, productId);
        try {
            if(productInCartIndex >= 0) {
                cart[productInCartIndex].quantity += quantity;
            } else {
                cart.push({productId: productId, quantity: quantity});
            }
        } catch(error) {
            throw new Error("Error adding product to cart");
        }

        return cart;
    }
  }
  
module.exports = userCartService;

