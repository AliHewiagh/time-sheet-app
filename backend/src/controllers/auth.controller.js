const User = require('../models/user');
const mongoose = require('mongoose');
const response = require('../helpers/response.helper');
const AuthHelper = require('../helpers/auth.helper');
const UserHelper = require('../helpers/user.helper');
const validator = require('validator');

const signup = async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
        });
        const result = await AuthHelper.signup(user);
        res.sendSuccess(result);
    } catch (error) {
        console.log(error);
        return res.sendError(error, '1', '', error);
    }
};

const login = async (req, res, next) => {
    let result = null;
    try {
        if (validator.isEmail(req.body.email.trim())) {
            result = await UserHelper.findByEmail(
                req.body.email.trim().toLowerCase(),
                req.body.password.trim()
            );
        } else {
            return res
                .status(401)
                .json(new response('0015', 'Email is not valid', null));
        }
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json(new response('-1', 'UNEXPECTED_ERROR', null));
    }

    if (!result) {
        return res
            .status(203)
            .json(new response('0017', 'wrong email or password', null));
    }

    try {
        const data = await AuthHelper.logUserIn(result);
        res.status(200).json(new response('0000', 'SUCCESSFUL', data));
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .json(new response('-1', 'UNEXPECTED_ERROR', null));
    }
};

const AuthController = {
    signup,
    login,
};

module.exports = AuthController;
