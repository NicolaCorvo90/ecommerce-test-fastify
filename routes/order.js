const orderService = require('../services/orderService');

const orderRoutes = (fastify, option, done) => {
    fastify.get("/api/orders", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(0) ]) }, async (request, reply) => {
        if(!request.userId) {
            reply.code(500).send();
            return;
        }

        try {
          reply.send(await orderService.findOrdersByUserId(request.userId));
        } catch (error) {
          reply.code(400).send(error.message);
        }
    });
    fastify.post("/api/order/createOrder", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(0) ]) }, async (request, reply) => {
        if(!request.userId) {
            reply.code(500).send();
            return;
        }
        try {
            if(await orderService.createOrder(request.userId)) {
                reply.code(201).send();
            } else {
                reply.code(400).send();
            }
        } catch (error) {
            reply.code(400).send(error.message);
        }
    });

    done();
};

module.exports = orderRoutes;