const fastify = require('fastify')({logger: true});
const userService = require('./services/userService');

fastify
.decorate('asyncVerifyJWT', function (scope) {
  return async (request, reply, done) => {
    try {
      if(!request.headers) {
        reply.code(400).send();
        return;
      }
      if(!request.headers.authorization) {
        reply.code(400).send();
        return;
      }
      const token = request.headers.authorization.split(" ")[1];
      const user = await userService.getUserFromToken(token);
      if(user) {
        if(scope && !user.isAdmin) {
          reply.code(403).send();
          return;
        }
        request.userid = user.id.toString();
      } else {
        reply.code(401).send();
        return;
      }
    } catch(error) {
      reply.code(401).send();
      return;
    }
  }
})
.decorate('verifyUsernameAndPassword', async function (request, reply, done) {
  try {
    if(!request.body) {
      reply.code(400).send();
      return;
    }

    const {username, password} = request.body;

    const user = await userService.searchUser(username, password);
    request.userid = user.id.toString();
  } catch(error) {
    reply.code(400).send(error.message);
    return;
  }
})
.register(require('@fastify/auth'));

fastify.register(require('./routes/cart'));
fastify.register(require('./routes/product'));
fastify.register(require('./routes/user'));
fastify.register(require('./routes/order'));
  
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()