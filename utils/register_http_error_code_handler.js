'use strict'

const assert = require('assert-plus');

function RegisterHTTPErrorCodeHandler(errorCodeMap) {
    assert.object(errorCodeMap);

    return function (req, res, next) {
        req.errorCodeMap = errorCodeMap;
        next();
    };
}

module.exports = RegisterHTTPErrorCodeHandler;