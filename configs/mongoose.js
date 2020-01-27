'use strict';

const _ = require('underscore');

const environments = {
    LOCAL: {
        //host: 'localhost',
        host: '52.77.255.162',
        port: 27017,
        db: 'messaging-service'
    },
    INTEGRATION: {
        host: process.env.MONGODB_HOST,
        host: process.env.MONGODB_PORT,
        db: process.env.MONGODB_DB,
    },
    STAGING: {
        host: process.env.MONGODB_HOST,
        host: process.env.MONGODB_PORT,
        db: process.env.MONGODB_DB,
    },
    PRODUCTION: {
        host: process.env.MONGODB_HOST,
        host: process.env.MONGODB_PORT,
        db: process.env.MONGODB_DB,
    }
};

module.exports = () => {
    const environment = (_.has(process.env.NODE_ENV)) ? process.env.NODE_ENV : 'LOCAL';
    return environments[environment];
};
