'use strict'

const app = require('./src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.PORT || '3000');

const server = http.createServer(app);
server.listen(port, () => {
    console.log('Listening on Port ' + port);
});
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(value) {
    const port = parseInt(value,10);

    if (isNaN(port)) 
        return value;

    if (port >= 0) 
        return port;

    return false;
}

function onError() {

    console.log('Ocorreu um erro');
}

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' 
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}