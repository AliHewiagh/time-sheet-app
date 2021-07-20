const { check } = require('express-validator');
const AuthController = require('../controllers/auth.controller');
const EventController = require('../controllers/event.controller');

const requestBodyValidator = require('../middlewares/requestBodyValidator.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const routes = (app) => {
    app.post('/v1/event', EventController.create);
    app.get('/v1/event', authMiddleware.authorize, EventController.get);
    app.patch('/v1/event/:id', authMiddleware.authorize, EventController.edit);

    app.post(
        '/v1/signup',
        [
            check('password')
                .isLength({
                    min: 6,
                })
                .withMessage('`password` should be more than 6 characters'),
            check('password').exists().withMessage('`password` is required'),
            check('email').exists().withMessage('`email` is required'),
        ],
        requestBodyValidator.check,
        AuthController.signup
    );
    app.post(
        '/v1/login',
        [
            check('password').exists().withMessage('`password` is required'),
            check('email').exists().withMessage('`email` is required'),
        ],
        requestBodyValidator.check,
        AuthController.login
    );
};

module.exports = routes;
