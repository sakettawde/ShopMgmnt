//Lets require/import the HTTP module
var http = require('http');
var express=require('express');
// var io = require('./socket/socket');
// var redis = require('socket.io-redis');



//Lets define a port we want to listen to
var port = process.env.port || 8090;
console.log( process.env.NODE_ENV );

var app = require('./api/api');


app.use('/assets/', express.static(__dirname + '/assets/'));
app.use('/uploads/', express.static(__dirname + '/uploads/'));
app.use('/', express.static(__dirname + '/frontend/'));
app.use('/', express.static(__dirname + '/admin/'));

app.use('/templates', express.static(__dirname + '/frontend/templates'));


/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// io.attach(server);
// console.log( 'process.env.NODE_ENV', process.env.NODE_ENV );
// if( typeof process.env.NODE_ENV == 'beta'  || typeof process.env.NODE_ENV =='staging'){
//   io.adapter(redis({ host: 'localhost', port: 6379 }));
// }
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') throw error;

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on: ' + bind);
}

