const orderService = require('../services/orderService');

const orderRoutes = (fastify, option, done) => {
  
    fastify.post("/api/order/createOrder", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(0) ]) }, async (request, reply) => {
        try {
            if(!request.user_id) {
                reply.code(500).send();
                return;
            }
        
            if(await orderService.createOrder(request.user_id)) {
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