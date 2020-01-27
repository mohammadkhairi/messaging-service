'use strict'

const { expect } = require('chai');
const mongoMockupServer = require('mongodb-mockup-server');

const IndividualChatDAO = require('../../data_objects/individual_chat_dao');
const { individualChatModel } = require('../../models/individual_chat');

describe.only('Individual Message DAO', () => {
    let individualChatDAO, mongMockupServer, model;

    beforeEach(async () => {
        mongMockupServer = mongoMockupServer();
        const connection = await mongMockupServer.setup();

        model = individualChatModel(connection);
        individualChatDAO = new IndividualChatDAO(model);
    });

    afterEach(() => {
        mongMockupServer.cleanup();
    });

    describe('Create individual chat', () => {
        describe('When provided with valid data', () => {
            it('should return no error', async () => {
                const param = {
                    owner_id: '1',
                    guest_id: '2'
                };

                const individualChat = await individualChatDAO.createIndividualChat(param);
                expect(individualChat.owner_id).equals('1');
            });
        });
    });

    describe('find individual chat by owner ID and guest ID', () => {
        describe('When provided with valid data', () => {
            beforeEach(async () => {
                const param = {
                    owner_id: '1',
                    guest_id: '2'
                };

                await model.create(param);
            });

            it('should return no error', async () => {
                const ownerId = '1';
                const guestId = '2';

                const individualChat = await individualChatDAO.findIndividualChatByOwnerIdAndGuestId(ownerId, guestId);
                expect(individualChat.owner_id).equals('1');
                expect(individualChat.guest_id).equals('2');
            });
        });

        describe('When provided with invalid data [when chat is not found]', () => {
            beforeEach(async () => {
                const param = {
                    owner_id: '1',
                    guest_id: '2'
                };

                await model.create(param);
            });

            it('should return INDIVIDUAL_CHAT_NOT_FOUND_ERROR', async () => {
                const ownerId = '1';
                const guestId = '3';

                try {
                    await individualChatDAO.findIndividualChatByOwnerIdAndGuestId(ownerId, guestId);
                }
                catch (err) {
                    expect(err.error_code).equals('INDIVIDUAL_CHAT_NOT_FOUND_ERROR');
                }
            });
        });

        describe.skip('When provided with invalid id', () => {
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
                    await individualChatDAO.updateIndividualChatStatusById(id, param);
                }
                catch (err) {
                    expect(err.error_code).equals('INDIVIDUAL_MESSAGE_NOT_FOUND_ERROR');
                }
            });
        });
    });

    describe.skip('Update individual message status', () => {
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

                const individualChat = await individualChatDAO.updateIndividualChatStatusById(id, param);
                expect(individualChat.status).equals('READ');
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
                    await individualChatDAO.updateIndividualChatStatusById(id, param);
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
                    await individualChatDAO.updateIndividualChatStatusById(id, param);
                }
                catch (err) {
                    expect(err.error_code).equals('INDIVIDUAL_MESSAGE_NOT_FOUND_ERROR');
                }
            });
        });
    });
});