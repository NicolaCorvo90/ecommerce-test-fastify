const orderService = require('../services/orderService');

test('validQuantity', () => {
    var quantity = 10;
    var product = {
        availableQuantity: 13,
        minPurchasableQuantity: 10,
        maxPurchasableQuantity: 85
    }

    expect(orderService.validQuantity(quantity, product)).toBe(true);
});

test('invalidQuantity < minPurchasableQuantity', () => {
    var quantity = 5;
    var product = {
        availableQuantity: 13,
        minPurchasableQuantity: 10,
        maxPurchasableQuantity: 85
    }

    var valid = true;
    try {
        valid = orderService.validQuantity(quantity, product)
    }catch(error) {
        valid = false;
    }

    expect(valid).toBe(false);
});

test('invalidQuantity > availableQuantity', () => {
    var quantity = 15;
    var product = {
        availableQuantity: 13,
        minPurchasableQuantity: 10,
        maxPurchasableQuantity: 85
    }

    var valid = true;
    try {
        valid = orderService.validQuantity(quantity, product)
    }catch(error) {
        valid = false;
    }

    expect(valid).toBe(false);
});

test('invalidQuantity > availableQuantity', () => {
    var quantity = 15;
    var product = {
        availableQuantity: 16,
        minPurchasableQuantity: 10,
        maxPurchasableQuantity: 14
    }

    var valid = true;
    try {
        valid = orderService.validQuantity(quantity, product)
    }catch(error) {
        valid = false;
    }

    expect(valid).toBe(false);
});