'use strict';

const assert = require('assert-plus');
const path = require('path')

const indexController = async (req, res) => {
    const file = path.join(__dirname + '../../views/index.html');
    res.sendFile(file);
};

module.exports = {
    indexController
}