'use strict';

const _ = require('underscore');

const generateMongoUri = (credentials) => {
    if (_.has(credentials, 'username') && _.has(credentials, 'password')) {
        return ['mongodb://', credentials.username, ':', credentials.password, '@', credentials.host, ':', credentials.port, '/', credentials.db].join('');
    } else {
        return ['mongodb://', credentials.host, ':', credentials.port, '/', credentials.db].join('');
    }
}

module.exports = (credentials) => {
    return generateMongoUri(credentials);
};