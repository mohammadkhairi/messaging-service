'use strict'

const {
    indexController
} = require('./../controllers/UiController');

module.exports = (router) => {
    router.get('/', indexController);
};
