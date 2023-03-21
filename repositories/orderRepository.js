const Order = require('../models/order');

const orderRepository = {
    findAll: () => {
        return Order.find();
    },
    save: (order) => {
        if(order) {
            var order = new Order({
                userId: order.userId,
                products: order.products
            })
            return order.save();
        } else {
            throw new Error("Invalid order");
        }
    }
}

module.exports = orderRepository;