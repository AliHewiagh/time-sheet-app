const tokenHelper = require('../helpers/token.helper');
const response = require('../helpers/response.helper');

const { UNAUTHORIZED } = require('../errorDefinition/errors.map');
class AuthMiddleware {
    static async authorize(req, res, next) {
        const token = req.headers['authorization'];
        let lang = req.header('languageid');
        if (lang) {
            switch (lang) {
                case '1':
                    global.currentLang = 'en-US';
                    break;
                default:
                    global.currentLang = 'en-US';
                    break;
            }
        } else {
            global.currentLang = 'en-US';
        }

        try {
            let tokenWithoutBearer = token.replace(/^Bearer\s/, '');

            const user = await tokenHelper.verify(
                tokenWithoutBearer.replace(/['"]+/g, '')
            );
            if (!user) {
                throw UNAUTHORIZED;
            }

            req.user = user;
            global.currentUser = user;

            next();
        } catch (e) {
            // console.log('sssss', e, lang);
            return res.sendError(e, req.header('languageId'));
        }
    }
}

module.exports = AuthMiddleware;
