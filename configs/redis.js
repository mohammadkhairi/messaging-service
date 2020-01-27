'use strict';

const _ = require('underscore');

const environments = {
    LOCAL: {
        host: 'localhost',
        port: 6379,
    },
    INTEGRATION: {
        host: process.env.REDIS_HOST,
        host: process.env.REDIS_PORT
    },
    STAGING: {
        host: process.env.REDIS_HOST,
        host: process.env.REDIS_PORT
    },
    PRODUCTION: {
        host: process.env.REDIS_HOST,
        host: process.env.REDIS_PORT
    }
};

module.exports = () => {
    const environment = (_.has(process.env.NODE_ENV)) ? process.env.NODE_ENV : 'LOCAL';
    return environments[environment];
};
