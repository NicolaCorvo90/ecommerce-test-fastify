const cognitoService = require('../services/cognitoService');

const userRoutes = (fastify, option, done) => {

  fastify.post("/api/users", 
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string', minLength: 1 },
          email: { type: 'string', minLength: 1 },
          password: { type: 'string', minLength: 1 },
        },
        required: ['username', 'email', 'password']
      }
    }
  },
  async (request, reply) => {
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

  fastify.post("/api/users/login", 
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string', minLength: 1 },
          password: { type: 'string', minLength: 1 },
        },
        required: ['username', 'password']
      }
    }
  }, async (request, reply) => {
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