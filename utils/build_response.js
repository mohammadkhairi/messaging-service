'use strict';

const assert = require('assert-plus');
const Joi = require('@hapi/joi');

const StandardError = require('standard-error');

const BuildResponse = (schema) => {
    assert.object(schema);

    return async (req, res, next) => {
        const responseData = res.response_data;
        try {
            const validatedResponseData = await Joi.validate(responseData, schema);
            return res.status(200).json(validatedResponseData);
        }
        catch (err) {
            return res.status(500).json(new StandardError('RESPONSE_VALIDATION_ERROR', 'Could not validate response data', err, {}));
        }
    };
}

module.exports = BuildResponse;