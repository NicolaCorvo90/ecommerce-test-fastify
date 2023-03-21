const cartService = {
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

module.exports = cartService;