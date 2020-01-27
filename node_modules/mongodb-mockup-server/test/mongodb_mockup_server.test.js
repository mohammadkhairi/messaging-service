'use strict'

const { expect } = require('chai');
const mongoose = require('mongoose');

const mongoMockServer = require('../src/mongodb_mockup_server');

describe('Mockup Server', () => {
    let TestModel,mockServer;

    before(() => {
        mockServer = mongoMockServer();
        mockServer.setup();

        TestModel = mongoose.model('TestModel', new mongoose.Schema({
            name: String,
            id: String,
        }));
    });

    after(() => {
        mockServer.cleanup();
    });

    describe('when  data into dummy model while running Mockup Mongodb Server', () => {
        it('should insert the data into the mongodb', async () => {
            const test = await TestModel.create({
                name: 'test',
                id: 'test'
            });

            expect(test.name).equals('test');
        });
    })
});