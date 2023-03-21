const cartService = require('../services/cartService');
const {default: mongoose } = require('mongoose');


test('findProductIdIndexInCart', () => {
    var cart = [
        {
            productId: new mongoose.Types.ObjectId("test12345678"), 
            quantity: 3
        },
        {
            productId: new mongoose.Types.ObjectId("test34567891"), 
            quantity: 8
        }
    ];
    var productId = "746573743334353637383931";

    var productInCartIndex = cartService.findProductIdIndexInCart(cart, productId);

    expect(productInCartIndex).toBe(1);
});

test('findProductIdIndexInCart - Empty cart', () => {
    var cart = [];
    var productId = "123455";

    var productInCartIndex = cartService.findProductIdIndexInCart(cart, productId);

    expect(productInCartIndex).toBe(-1);
});

test('findProductIdIndexInCart - ProductNotExists', () => {
    var cart = [
        {
            productId: new mongoose.Types.ObjectId("test12345678"), 
            quantity: 3
        },
        {
            productId: new mongoose.Types.ObjectId("test34567891"), 
            quantity: 8
        }
    ];
    var productId = "123455";

    var productInCartIndex = cartService.findProductIdIndexInCart(cart, productId);

    expect(productInCartIndex).toBe(-1);
});

test('addOrUpdateElementToCart', () => {
    var cart = [];
    var productId = new mongoose.Types.ObjectId("test12345678");
    var quantity = 3;

    cart = cartService.addProductIdToCart(cart, productId, quantity);
    var valid = false;
    valid = (cart[0].productId == "746573743132333435363738" && cart[0].quantity == 3);

    expect(valid).toBe(true);
});

test('addOrUpdateElementToCart withoutQuantity', () => {
    var cart = [];
    var productId = new mongoose.Types.ObjectId("test12345678");

    cart = cartService.addProductIdToCart(cart, productId);
    var valid = false;
    valid = (cart[0].productId == "746573743132333435363738" && cart[0].quantity == 1);

    expect(valid).toBe(true);
});

test('addOrUpdateElementToCart existingProduct', () => {
    var productId = new mongoose.Types.ObjectId("test12345678");
    var cart = [
        {
            productId: productId, 
            quantity: 3
        }
    ];

    cart = cartService.addProductIdToCart(cart, productId);
    var valid = false;
    valid = (cart[0].productId == "746573743132333435363738" && cart[0].quantity == 4);

    expect(valid).toBe(true);
});