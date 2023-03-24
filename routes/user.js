const jwtService = require('../services/jwtService');
const userService = require('../services/userService');

const userRoutes = (fastify, option, done) => {
  
  fastify.get("/api/users", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(1) ]) }, async (request, reply) => {
    try {
      reply.send(await userService.findAll());
    } catch (error) {
      reply.code(400).send(error.message);
    }
  });

  fastify.post("/api/users", async (request, reply) => {
    try {
      if(!request.body) {
        reply.code(400).send();
        return;
      }

      const { username, password, isAdmin } = request.body;
      const user = {
        "username": username,
        "password": password,
        "isAdmin": isAdmin
      };

      if(await userService.save(user)) {
        reply.code(201).send();
      } else {
        reply.code(400).send();
      }
    } catch (error) {
      reply.code(400).send(error.message);
    }
  });

  fastify.patch("/api/users/:id", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(0) ]) }, async (request, reply) => {
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
      const { username, password, isAdmin } = request.body;
      const user = {
        "username": username,
        "password": password,
        "isAdmin": isAdmin
      };
      if(await userService.update(id, user)) {
        reply.code(204).send();
      } else {
        reply.code(400).send();
      }
    } catch (error) {
      reply.code(400).send(error.message);
    }
  });

  fastify.delete("/api/users/:id", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(0) ]) }, async (request, reply) => {
    try {
      if(!request.params) {
        reply.code(400).send();
        return;
      }

      const id = request.params.id;
      if(await userService.delete(id)) {
        reply.code(204).send();
      } else {
        reply.code(400).send();
      }
    } catch (error) {
      reply.code(400).send(error.message);
    }
  });

  fastify.post("/api/users/login", { preHandler: fastify.auth([ fastify.verifyUsernameAndPassword ]) }, async (request, reply) => {
    try {
      if(!request.userid) {
        reply.code(500).send();
        return;
      }

      const token = jwtService.generateToken({id: request.userid});
      reply.send(token);
    } catch(error) {
      reply.code(400).send(error.message);
    }
  });

  fastify.get("/api/users/me", { preHandler: fastify.auth([ fastify.asyncVerifyJWT(0) ]) }, async (request, reply) => {
    try {
      if(!request.userid) {
        reply.code(500).send();
        return;
      }
      const user = await userService.findById(request.userid);
      if(user) {
        reply.send(user);
      } else {
        reply.code(401).send();
      }
    } catch(error) {
      reply.code(400).send(error.message);
    }
  });


  done();
}

module.exports = userRoutes;