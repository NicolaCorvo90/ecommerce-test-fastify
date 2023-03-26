const cognitoService = require('../services/cognitoService');

const userRoutes = (fastify, option, done) => {

  fastify.post("/api/users", async (request, reply) => {
    if(!request.body) {
      reply.code(400).send();
      return;
    }

    const { username, email, password } = request.body;
    const user = {
      "username": username,
      "email": email,
      "password": password
    };

    try {
      if(await cognitoService.signUp(user)) {
        reply.code(201).send();
      } else {
        reply.code(400).send();
      }
    } catch (error) {
      reply.code(400).send(error.message);
    }
  });

  fastify.post("/api/users/login", async (request, reply) => {
    if(!request.body) {
      reply.code(400).send();
      return;
    }

    const {username, password} = request.body;

    var user = {
      username: username,
      password: password
    }

    try {
      var token = await cognitoService.login(user);
      reply.send(token);
    } catch(error) {
      reply.code(404).send();
    }
  });

  done();
}

module.exports = userRoutes;