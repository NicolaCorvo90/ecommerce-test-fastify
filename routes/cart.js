const userService = require('../services/userService');

const cartRoutes = (fastify, option, done) => {
  
    fastify.post("/api/cart/addProductToCart", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(0) ]) }, async (request, reply) => {
        try {
            if(!request.body) {
                reply.code(400).send();
                return;
            }

            if(!request.userid) {
                reply.code(500).send();
                return;
            }
        
            const { productId, quantity } = request.body;

            if(await userService.addProductToCart(request.userid, productId, quantity)) {
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

module.exports = cartRoutes;