const fastify = require('fastify')({
    logger: false
});
const path = require('path');

const port = process.env.PORT || '3000';

fastify.register(require('fastify-compress'));

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'dist'),
    prefix: '/' // optional: default '/'
});

// Declare a route
fastify.get('/', function(request, reply) {
    reply.sendFile('index.html');
});

fastify.get('/hello', function(request, reply) {
    // request.log.info('Some info about the current request');
    reply.send({ hello: 'world' });
});

// Run the server!
fastify.listen(port, '0.0.0.0', function(err) {
    if (err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`);
});
