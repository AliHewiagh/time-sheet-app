const EventHelper = require('../helpers/event.helper');

const create = async (req, res, next) => {
    const event = req.body;
    try {
        const token = req.headers['authorization'];

        const result = await EventHelper.create(event, token);
        res.sendSuccess(result);
    } catch (error) {
        res.sendError(error, '1');
        console.log('Error', error);
    }
};

const get = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        const result = await EventHelper.getByUid(token);
        res.sendSuccess(result);
    } catch (error) {
        console.log('Error ======> ', error);
        res.sendError(error, '1');
    }
};

const edit = async (req, res, next) => {
    const eventId = req.params.id;
    const eventProps = req.body;
    try {
        console.log('Event to be updated:', eventProps);
        const event = await EventHelper.editEvent(eventProps, eventId);
        res.sendSuccess(event);
    } catch (error) {
        console.log('Error', error);
        res.sendError(error, '1');
    }
};

const EventController = {
    create,
    get,
    edit,
};

module.exports = EventController;
