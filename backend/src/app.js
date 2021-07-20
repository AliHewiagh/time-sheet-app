require('dotenv').config();

// Express App Setup
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const { connectDB } = require('./config/db');

const Response = require('./classes/response');
const ErrorHelper = require('./helpers/error.helper');

// Connect Database
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow cors
app.use(cors());

// overwrite languageId
app.use(function (req, res, next) {
    if (!req.header('languageId')) {
        req.headers['languageid'] = req.header('language-id');
    }
    next();
});
// overwrite res object
app.use(function (req, res, next) {
    res.sendSuccess = (data, total_count) => {
        return res.json(
            new Response({
                code: '0000',
                data,
            })
        );
    };

    res.sendError = (code, languageId, action, devError) => {
        return res.json(
            ErrorHelper.getError(code, languageId, action, devError)
        );
    };
    next();
});

// for testing purposes
app.get('/test', (req, res) => {
    res.status(200).send({ text: 'working!' });
});

routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;
