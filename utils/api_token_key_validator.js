'use strict'

const APITokenKeyValidator = (APITokenKey) => {
    return (req, res, next) => {
        if (req.get('api-key-token') !== APITokenKey) {
            return res.status(401).send({
                error_code: 'INVALID_API_KEY',
                message: 'Your API key is invalid'
            });
        }
        next();
    }
}

module.exports = APITokenKeyValidator;