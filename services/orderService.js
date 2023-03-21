const orderRepository = require('../repositories/orderRepository');
const userService = require('./userService');
const productService = require('./productService');

const orderService = {
    findAll: () => {
        return orderRepository.findAll();
    },
    createOrder: async (user_id) => {
        if(!user_id) {
            throw new Error("Empty user_id");
        }

        const user = await userService.findById(user_id);

        var order = {
            userId: user._id,
            products: user.cart
        }

        var valid = await module.exports.validateOrder(order);
        if(valid && valid.result == false) {
            throw new Error(valid.errors);
        } else {
            await orderRepository.save(order);
            await module.exports.updateProducts(order);
            await userService.deleteCart(user_id);
        }

        return true;
    },
    validateOrder: async (order) => {
        var valid = {
            result: true,
            errors: ""
        };

        if(!order) {
            throw new Error("Invalid order");
        }
        if(!order.products) {
            throw new Error("Invalid products");
        }
        if(order.products.size == 0) {
            throw new Error("Empty product list");
        }

        for(let productElement of order.products) {
            var product = await productService.findById(productElement.productId.toString());
            try {
                module.exports.validQuantity(productElement.quantity, product);
            } catch(error) {
                valid.result = false;
                valid.errors += error + " ";
            }
        }

        return valid;
    },
    validQuantity: (quantity, product) => {
        if(!quantity) {
            throw new Error("Invalid quantity");
        }

        if(!product) {
            throw new Error("Invalid product");
        }

        if(quantity > product.availableQuantity) {
            throw new Error("Quantity > availableQuantity");
        }

        if(quantity < product.minPurchasableQuantity) {
            throw new Error("Quantity < minPurchasableQuantity");
        }

        if(quantity > product.maxPurchasableQuantity) {
            throw new Error("Quantity > maxPurchasableQuantity");
        }

        return true;
    },
    updateProducts: async (order) => {
        if(!order) {
            throw new Error("Invalid order");
        }
        if(!order.products) {
            throw new Error("Invalid products");
        }
        if(order.products.size == 0) {
            throw new Error("Empty product list");
        }

        for(let productElement of order.products) {
            await productService.subQuantity(productElement.productId.toString(), productElement.quantity);
        }
    }
}
  
module.exports = orderService;

