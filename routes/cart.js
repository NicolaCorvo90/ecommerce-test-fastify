const userCartService = require('../services/userCartService');

const cartRoutes = (fastify, option, done) => {
  
    fastify.post("/api/cart/addProductToCart", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(0) ]) }, async (request, reply) => {
        try {
            if(!request.body) {
                reply.code(400).send();
                return;
            }

            if(!request.userId) {
                reply.code(500).send();
                return;
            }
        
            const { productId, quantity } = request.body;

            var result = await userCartService.addProduct(request.userId, productId, quantity);
            if(result.result) {
                if(result.insert) {
                    reply.code(201).send();
                } else {
                    reply.code(204).send();
                }
            } else {
                reply.code(400).send();
            }
        } catch (error) {
            reply.code(400).send(error.message);
        }
    });

    done();
};

module.exports = cartRoutes;