'use strict';

const assert = require('assert-plus');

class StandardError extends Error {
    constructor(errorCode, message, lastError, context) {
        assert.optionalString(errorCode);
        assert.optionalString(message);
        assert.optionalObject(lastError);
        assert.optionalObject(context);

        super();

        this.error_code = errorCode;
        this.message = message;
        this.stack = (Error()).stack;
        this.last_error = lastError;
        this.context = context;

        if (this.lastError) {
            this.stack += '\n-\n' + lastError.stack;
        }
    }
}

module.exports = StandardError;