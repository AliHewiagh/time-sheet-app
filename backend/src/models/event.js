const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    _id: Schema.Types.ObjectId,
    event_id: {
        type: String,
        required: true,
        index: true,
    },
    uid: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    req_hours: {
        type: Number,
        required: true,
    },
    hour: {
        type: Number,
        required: true,
    },
    posts: {
        type: [],
        required: true,
    },
    date: {
        type: Date,
        required: true,
        unique: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const EventModel = model('Event', eventSchema);
module.exports = EventModel;
