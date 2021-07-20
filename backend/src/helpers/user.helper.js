const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const ObjectId = require('mongoose').Types.ObjectId;

class UserHelper {
    static async isUserExist(email) {
        try {
            const result = await User.find({ email: email });
            return result.length > 0;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async hashPassword(password) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(password, salt);
            if (!hashPass) {
                throw new Error('Salt is not generated!');
            }

            return hashPass;
        } catch (error) {
            throw error;
        }
    }

    static async create(email, password) {
        try {
            let user = {
                _id: ObjectId(),
                email: email.trim(),
                password: password,
            };

            user.uid = user._id.toString();

            const result = await User.create(user);

            return result;
        } catch (e) {
            throw e;
        }
    }

    static async findByEmail(email, password) {
        let result;
        try {
            result = await User.find({ email: email });
            result = result[0];

            if (result) {
                if (bcrypt.compareSync(password, result.password)) {
                    return result;
                }
                return null;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserHelper;
