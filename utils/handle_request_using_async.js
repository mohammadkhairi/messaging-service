'use strict';

const HandleRequestUsingAsync = (asyncHandler) => {
    return (req, res, next) => {
        const response = asyncHandler(req);

        response.then((response) => {
            res.response_data = response;
            next(null);
        }).catch((err) => {
            return res.status(req.errorCodeMap[err.error_code]).send(err);
        });
    };
}
module.exports = HandleRequestUsingAsync;