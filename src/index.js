const colors = require('colors'); 
const server = require('./app');
const V = require('./global');

process.on('uncaughtException', err => {
    console.log("ERR / " + '500 '.red + err.message);
});

console.log('Welcome to Sausage Server');

server.listen(V.server.port);
console.log('SER / ' + '200'.green + ` Server started, listened port: ${V.server.port}`);