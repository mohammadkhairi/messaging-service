'use strict';

const redis = require('socket.io-redis');

module.exports = (credentials) => {
    return redis({ host: credentials.host, port: credentials.port })
};
