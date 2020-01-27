'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IndividualMessageDAO = require('../data_objects/individual_message_dao');

const individualMessageModel = (connection) => {
    return connection.model('IndividualMessage', individualMessageSchema);
}

const individualMessageSchema = new Schema(
    {
        content: { type: String, required: true },
        status: {
            type: String,
            enum: Object.values(IndividualMessageDAO.getIndividualMessageStatus),
            default: IndividualMessageDAO.getIndividualMessageStatus.UNREAD,
            required: true,
        },
        author_id: { type: String, required: true }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id.toString();

                delete ret._id;
                delete ret.__v;

                return ret;
            }
        }
    }
);

module.exports = {
    individualMessageModel,
    individualMessageSchema
};
