'use strict'

const { expect } = require('chai');
const mongoMockupServer = require('mongodb-mockup-server');

const IndividualMessageDAO = require('../../data_objects/individual_message_dao');
const { individualMessageModel } = require('../../models/individual_message');

describe('Individual Message DAO', () => {
    let individualMessageDAO, mongMockupServer, model;

    beforeEach(async () => {
        mongMockupServer = mongoMockupServer();
        const connection = await mongMockupServer.setup();

        model = individualMessageModel(connection);
        individualMessageDAO = new IndividualMessageDAO(model);
    });

    afterEach(() => {
        mongMockupServer.cleanup();
    });

    describe('Create individual message', () => {
        describe('When provided with valid data', () => {
            it('should return no error', async () => {
                const param = {
                    content: 'dummy',
                    status: 'UNREAD',
                    author_id: '123232'
                };

                const individualMessage = await individualMessageDAO.createIndividualMessage(param);
                expect(individualMessage.author_id).equals('123232');
            });
        });

        describe('When provided with invalid data [ wrong status ]', () => {
            it('should return CREATE_INDIVIDUAL_MESSAGE_ERROR', async () => {
                const param = {
                    content: 'dummy',
                    status: 'NOT_READ',
                    author_id: '123232'
                };

                try {
                    await individualMessageDAO.createIndividualMessage(param);
                }
                catch (err) {
                    expect(err.error_code).equals('CREATE_INDIVIDUAL_MESSAGE_ERROR');
                }
            });
        });
    });

    describe('Update individual message status', () => {
        describe('When provided with valid data', () => {
            beforeEach(async () => {
                const param = {
                    content: 'dummy',
                    status: 'UNREAD',
                    author_id: '123232',
                    _id: '5cf55b50f52f211b721f7a8b'
                };

                await model.create(param);
            });

            it('should return no error', async () => {
                const id = '5cf55b50f52f211b721f7a8b';

                const param = {
                    status: 'READ'
                };

                const individualMessage = await individualMessageDAO.updateIndividualMessageStatusById(id, param);
                expect(individualMessage.status).equals('READ');
            });
        });

        describe('When provided with invalid data [wrong status]', () => {
            beforeEach(async () => {
                const param = {
                    content: 'dummy',
                    status: 'UNREAD',
                    author_id: '123232',
                    _id: '5cf55b50f52f211b721f7a8b'
                };

                await model.create(param);
            });

            it('should return UPDATE_INDIVIDUAL_MESSAGE_STATUS_ERROR', async () => {
                const id = '5cf55b50f52f211b721f7a8b';

                const param = {
                    status: 'NOT_READ'
                };

                try {
                    await individualMessageDAO.updateIndividualMessageStatusById(id, param);
                }
                catch (err) {
                    expect(err.error_code).equals('UPDATE_INDIVIDUAL_MESSAGE_STATUS_ERROR');
                }
            });
        });

        describe('When provided with invalid id', () => {
            beforeEach(async () => {
                const param = {
                    content: 'dummy',
                    status: 'UNREAD',
                    author_id: '123232',
                    _id: '5cf55b50f52f211b721f7a8b'
                };

                await model.create(param);
            });

            it('should return INDIVIDUAL_MESSAGE_NOT_FOUND_ERROR', async () => {
                const id = '5cf55b50f52f211b721f7a8c';

                const param = {
                    status: 'READ'
                };

                try {
                    await individualMessageDAO.updateIndividualMessageStatusById(id, param);
                }
                catch (err) {
                    expect(err.error_code).equals('INDIVIDUAL_MESSAGE_NOT_FOUND_ERROR');
                }
            });
        });
    });
});