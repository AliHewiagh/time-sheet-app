const userHelper = require('./user.helper');
const token = require('./token.helper');

const { EMAIL_EXIST } = require('../errorDefinition/errors.map');

class AuthHelper {
    static async signup(user) {
        let userExist = await userHelper.isUserExist(user.email);
        console.log('userExist', userExist);
        if (userExist) {
            throw EMAIL_EXIST;
        }

        let password = await userHelper.hashPassword(user.password.trim());

        let registeredUser = await userHelper.create(user.email, password);

        let { generatedToken, refreshToken } = await token.generate(
            registeredUser
        );

        let data = {
            _id: registeredUser._id,
            uid: registeredUser.uid,
            email: registeredUser.email,
            token: generatedToken.token,
            refresh_token: refreshToken,
        };

        return data;
    }

    static async logUserIn(user) {
        try {
            let { generatedToken, refreshToken } = await token.generate(user);
            let data = {
                uid: user.uid,
                email: user.email,
                token: generatedToken.token,
                refresh_token: refreshToken,
            };

            return data;
        } catch (error) {
            console.log('auth helper error:', error);

            throw error;
        }
    }
}

module.exports = AuthHelper;
