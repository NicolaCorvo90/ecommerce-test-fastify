const fastify = require('fastify')({logger: true});
const cognitoService = require('./services/cognitoService');

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

      var userInfo = await cognitoService.getUserInfo(token);
      if(userInfo) {
        if(scope && !userInfo.isAdmin) {
          reply.code(403).send();
          return;
        }
        request.userId = userInfo.userId;
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