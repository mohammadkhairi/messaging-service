const mongoose = require('mongoose');

const setupMongodbConnection = (mongooseURI, mongooseURISetting) => {
    return mongoose.createConnection(
        mongooseURI(mongooseURISetting()),
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        }
    );
}

module.exports = (app, mongooseURI, mongooseURISetting) => {
    const mongodbConnection = setupMongodbConnection(mongooseURI, mongooseURISetting);

    return (req, res, next) => {
        app.locals.dbConnection = mongodbConnection;
        next();
    }
}