'use strict'

const mongoose = require('mongoose');

const { individualMessageSchema } = require('./individual_message');

const Schema = mongoose.Schema;

const individualChatModel = (connection) => {
    return connection.model('IndividualChat', individualChatSchema);
}

const individualChatSchema = new Schema(
    {
        owner_id: { type: String, required: true },
        guest_id: { type: String, required: true },
        messages: [individualMessageSchema]
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
    individualChatModel,
    individualChatSchema
};
