const uuid = require('uuid');
const Order = require('../models/order');

const orderRepository = {
    findAll: async () => {
        return await Order.scan().exec();
    },
    findByUserId: async (userId) => {
        return await Order.scan("userId").eq(userId).exec();
    },
    save: async (order) => {
        if(order) {
            var order = new Order({
                id: uuid.v4(),
                userId: order.userId,
                products: order.products
            })
            return await order.save();
        } else {
            throw new Error("Invalid order");
        }
    }
}

module.exports = orderRepository;