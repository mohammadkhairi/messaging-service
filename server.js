'use strict'

//import vendor files
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

//import local file
const redisConfig = require('./configs/redis');
const redisURIConfig = require('./configs/redis_uri');
const uiRoute = require('./routes/ui_route');
const ioRoute = require('./routes/io_route');

//initialize process
const app = express();
const port = 8002; // default port to listen
const server = http.createServer(app);
const redis = redisConfig();
const redisURI = redisURIConfig(redis);
const io = socketIO.listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
io.adapter(redisURI);

const router = app._router;
uiRoute(router);
ioRoute(io);

const mongooseURISetting = require('./configs/mongoose');
const db = mongoose.createConnection(
    require('./configs/mongoose_uri')(mongooseURISetting()),
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    }
);

server.listen(port, function () {
    console.log('Connected ');
});

