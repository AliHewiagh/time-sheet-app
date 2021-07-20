const EventModel = require('../models/event');
const TokenHelper = require('../helpers/token.helper');

const ObjectId = require('mongoose').Types.ObjectId;

class EventHelper {
    static async create(data, token) {
        try {
            const user = await TokenHelper.getUserFromToken(token);

            if (!user) {
                throw UNAUTHORIZED;
            }

            let event = {
                _id: ObjectId(),
                status: data.status,
                req_hours: data.req_hours,
                hour: data.hour,
                posts: data.posts,
                uid: user.uid,
                date: data.date,
                isDeleted: false,
            };

            event.event_id = event._id.toString();
            const result = await EventModel.create(event);
            return result;
        } catch (e) {
            throw e;
        }
    }

    static async getByUid(token) {
        try {
            const user = await TokenHelper.getUserFromToken(token);

            if (!user) {
                throw UNAUTHORIZED;
            }

            const result = await EventModel.find({
                uid: user.uid,
                isDeleted: false,
            });

            return result;
        } catch (e) {
            throw e;
        }
    }

    static async editEvent(event, event_id) {
        try {
            if (event.posts.length < 1) {
                console.log('Sould be deleted');
                event.isDeleted = true;
            }

            const result = await EventModel.findByIdAndUpdate(
                { _id: event_id },
                event
            );

            return result;
        } catch (error) {
            throw error;
        }
    }

    static async findById(event_id) {
        try {
            const result = await EventModel.find({ _id: event_id });

            return result;
        } catch (error) {
            throw errors;
        }
    }

    static async deleteById(event_id) {
        try {
            const result = await EventModel.remove({ event_id: event_id });

            return result;
        } catch (error) {
            throw errors;
        }
    }
}

module.exports = EventHelper;
