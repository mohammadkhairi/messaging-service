'use strict'

const assert = require('assert-plus');
const _ = require('underscore');

const StandardError = require('./../utils/standard_error');

class IndividualMessageDAO {
    constructor(individualMessageModel) {
        this.individualMessageModel = individualMessageModel;
    }

    async createIndividualMessage(param) {
        assert.object(param, 'Create parameter');
        assert.string(param.author_id, 'Author id required');
        assert.string(param.content, 'Content required');
        assert.string(param.status, 'Status required');

        const errorContext = { param };

        let individualMessage;

        try {
            individualMessage = await this.individualMessageModel.create(param);
        }
        catch (err) {
            throw new StandardError(
                IndividualMessageDAO.ErrorCode.CREATE_INDIVIDUAL_MESSAGE_ERROR,
                IndividualMessageDAO.ErrorMessage.CREATE_INDIVIDUAL_MESSAGE_ERROR,
                err,
                errorContext
            );
        }
        return individualMessage.toJSON();
    }


    async updateIndividualMessageStatusById(id, param, option) {
        assert.string(id, 'ID required');
        assert.object(param, "Update parameter");
        assert.string(param.status, "Status required");
        assert.optionalObject(option);

        const errorContext = {
            id,
            ...param,
            ...option
        };

        const opt = (_.has(option)) ? option : { new: true, runValidators: true };

        let individualMessage;

        try {
            individualMessage = await this.individualMessageModel.findOneAndUpdate(
                { _id: id },
                param,
                opt
            );
        }
        catch (err) {
            throw new StandardError(
                IndividualMessageDAO.ErrorCode.UPDATE_INDIVIDUAL_MESSAGE_STATUS_ERROR,
                IndividualMessageDAO.ErrorMessage.UPDATE_INDIVIDUAL_MESSAGE_STATUS_ERROR,
                err,
                errorContext
            );
        }

        if (_.isEmpty(individualMessage)) {
            throw new StandardError(
                IndividualMessageDAO.ErrorCode.INDIVIDUAL_MESSAGE_NOT_FOUND_ERROR,
                IndividualMessageDAO.ErrorMessage.INDIVIDUAL_MESSAGE_NOT_FOUND_ERROR,
                null,
                errorContext
            );
        }

        return individualMessage.toJSON();
    }

    get getIndividualMessageStatus() {
        return IndividualMessageDAO.getIndividualMessageStatus;
    }
}

IndividualMessageDAO.getIndividualMessageStatus = {
    UNREAD: 'UNREAD',
    READ: 'READ',
    DELETED: 'DELETED'
}

IndividualMessageDAO.ErrorCode = {
    INDIVIDUAL_MESSAGE_NOT_FOUND_ERROR: 'INDIVIDUAL_MESSAGE_NOT_FOUND_ERROR',
    FIND_INDIVIDUAL_MESSAGE_ERROR: 'FIND_INDIVIDUAL_MESSAGE_ERROR',
    CREATE_INDIVIDUAL_MESSAGE_ERROR: 'CREATE_INDIVIDUAL_MESSAGE_ERROR',
    UPDATE_INDIVIDUAL_MESSAGE_STATUS_ERROR: 'UPDATE_INDIVIDUAL_MESSAGE_STATUS_ERROR'
};

IndividualMessageDAO.ErrorMessage = {
    INDIVIDUAL_MESSAGE_NOT_FOUND_ERROR: 'individual message record not found',
    FIND_INDIVIDUAL_MESSAGE_ERROR: 'Failed to find the individual message',
    CREATE_INDIVIDUAL_MESSAGE_ERROR: 'Unable to create individual message',
    UPDATE_INDIVIDUAL_MESSAGE_STATUS_ERROR: 'Unable to update individual message status'
};

module.exports = IndividualMessageDAO;
