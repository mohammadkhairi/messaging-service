'use strict'

const assert = require('assert-plus');
const _ = require('underscore');

const StandardError = require('./../utils/standard_error');

class IndividualChatDAO {
    constructor(individualChatModel) {
        this.individualChatModel = individualChatModel;
    }

    async createIndividualChat(param) {
        assert.object(param, 'Create parameter');
        assert.string(param.owner_id, 'Owner ID parameter');
        assert.string(param.guest_id, 'Guest ID parameter');

        const errorContext = { param };

        let individualChat;

        try {
            individualChat = await this.individualChatModel.create(param);
        }
        catch (err) {
            throw new StandardError(
                IndividualChatDAO.ErrorCode.CREATE_INDIVIDUAL_CHAT_ERROR,
                IndividualChatDAO.ErrorMessage.CREATE_INDIVIDUAL_CHAT_ERROR,
                err,
                errorContext
            );
        }
        return individualChat.toJSON();
    }

    async createIndividualChatWhenNotExist(param) {
        assert.object(param, 'Create parameter');
        assert.string(param.owner_id, 'Owner ID parameter');
        assert.string(param.guest_id, 'Guest ID parameter');

        const errorContext = { param };

        let individualChat;

        try {
            individualChat = await this.individualChatModel.create(param);
        }
        catch (err) {
            throw new StandardError(
                IndividualChatDAO.ErrorCode.CREATE_INDIVIDUAL_CHAT_ERROR,
                IndividualChatDAO.ErrorMessage.CREATE_INDIVIDUAL_CHAT_ERROR,
                err,
                errorContext
            );
        }
        return individualChat.toJSON();
    }

    async findIndividualChatByOwnerIdAndGuestId(ownerId, guestId) {
        assert.string(ownerId, 'Owner ID parameter');
        assert.string(guestId, 'Owner ID parameter');
        const errorContext = {
            ownerId,
            guestId
        };

        let individualChat;

        try {
            individualChat = await this.individualChatModel.findOne({
                owner_id: ownerId,
                guest_id: guestId
            });
        }
        catch (err) {
            throw new StandardError(
                IndividualChatDAO.ErrorCode.FIND_INDIVIDUAL_CHAT_ERROR,
                IndividualChatDAO.ErrorMessage.FIND_INDIVIDUAL_CHAT_ERROR,
                err,
                errorContext
            );
        }

        if (_.isEmpty(individualChat)) {
            throw new StandardError(
                IndividualChatDAO.ErrorCode.INDIVIDUAL_CHAT_NOT_FOUND_ERROR,
                IndividualChatDAO.ErrorMessage.INDIVIDUAL_CHAT_NOT_FOUND_ERROR,
                null,
                errorContext
            );
        }

        return individualChat.toJSON();
    }

    get getIndividualChatStatus() {
        return IndividualChatDAO.getIndividualChatStatus;
    }
}

IndividualChatDAO.ErrorCode = {
    INDIVIDUAL_CHAT_NOT_FOUND_ERROR: 'INDIVIDUAL_CHAT_NOT_FOUND_ERROR',
    FIND_INDIVIDUAL_CHAT_ERROR: 'FIND_INDIVIDUAL_CHAT_ERROR',
    CREATE_INDIVIDUAL_CHAT_ERROR: 'CREATE_INDIVIDUAL_CHAT_ERROR',
    UPDATE_INDIVIDUAL_CHAT_ERROR: 'UPDATE_INDIVIDUAL_CHAT_ERROR'
};

IndividualChatDAO.ErrorMessage = {
    INDIVIDUAL_CHAT_NOT_FOUND_ERROR: 'individual chat record not found',
    FIND_INDIVIDUAL_CHAT_ERROR: 'Failed to find the individual chat',
    CREATE_INDIVIDUAL_CHAT_ERROR: 'Unable to create individual chat',
    UPDATE_INDIVIDUAL_CHAT_ERROR: 'Unable to update individual chat'
};

module.exports = IndividualChatDAO;
