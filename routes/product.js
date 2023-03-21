const productService = require('../services/productService');

const productRoutes = (fastify, option, done) => {
  
  fastify.get("/api/products", async (request, reply) => {
    try {
      reply.send(await productService.findAll());
    } catch (error) {
      reply.code(400).send(error.message);
    }
  });

  fastify.post("/api/products", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(1) ]) }, async (request, reply) => {
    try {
      if(!request.body) {
        reply.code(400).send();
        return;
      }

      const { name, price, availableQuantity, minPurchasableQuantity, maxPurchasableQuantity } = request.body;
      const product = {
        "name": name,
        "price": price,
        "availableQuantity": availableQuantity,
        "minPurchasableQuantity": minPurchasableQuantity,
        "maxPurchasableQuantity": maxPurchasableQuantity
      };

      if(await productService.save(product)) {
        reply.code(201).send();
      } else {
        reply.code(400).send();
      }
    } catch (error) {
      reply.code(400).send(error.message);
    }
  });

  fastify.patch("/api/products/:id", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(1) ]) }, async (request, reply) => {
    try {
      if(!request.params) {
        reply.code(400).send();
        return;
      }
      if(!request.body) {
        reply.code(400).send();
        return;
      }

      const id = request.params.id;
      const { name, price, availableQuantity, minPurchasableQuantity, maxPurchasableQuantity } = request.body;
      const product = {
        "name": name,
        "price": price,
        "availableQuantity": availableQuantity,
        "minPurchasableQuantity": minPurchasableQuantity,
        "maxPurchasableQuantity": maxPurchasableQuantity
      };
      if(await productService.update(id, product)) {
        reply.code(204).send();
      } else {
        reply.code(400).send();
      }
    } catch (error) {
      reply.code(400).send(error.message);
    }
  });

  fastify.delete("/api/products/:id", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(1) ]) }, async (request, reply) => {
    try {
      if(!request.params) {
        reply.code(400).send();
        return;
      }

      const id = request.params.id;
      if(await productService.delete(id)) {
        reply.code(204).send();
      } else {
        reply.code(400).send();
      }
    } catch (error) {
      reply.code(400).send(error.message);
    }

  });

  done();
}

module.exports = productRoutes;