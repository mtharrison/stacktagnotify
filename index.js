// Load modules

var Hapi = require('hapi');
var Config = require('./config');


// Create Hapi server

var server = new Hapi.Server();


// Add connections

server.connection({ port: Config.port });


// Add routes

server.route(require('./routes'));


// Add server methods

require('./methods')(server);


// Start server

server.start(function () {

    console.log('Server started');
});