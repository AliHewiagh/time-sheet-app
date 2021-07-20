const Response = require('../classes/response');
const englishMessageConstant = require('../languages/englishMessageConstant.language');

class Error {
    static getError(code, languageId = 1, action, devError = '') {
        let message;
        try {
            message = this.getLanguageSpecificErrorMessage(code, languageId);
        } catch (e) {
            if (e instanceof LanguageException) {
                languageId = '1';
                // logger wrong language Id
            } else {
                // logger wrong Code passed
            }
        }

        if (!message) {
            code = '-1';
            message = this.getLanguageSpecificErrorMessage(code, languageId);
        }

        if (action) {
            if (typeof action !== 'string') {
                action = JSON.stringify(action);
            }
        }

        if (devError) {
            if (typeof devError !== 'string') {
                devError = JSON.stringify(devError);
            }
        }

        return new Response({
            code,
            message,
            action,
            devError,
        });
    }

    static getLanguageSpecificErrorMessage(code, languageId) {
        switch (languageId) {
            case '1':
                return englishMessageConstant[code];
            default:
                throw new LanguageException('language id is invalid');
        }
    }
}

class LanguageException extends Error {
    constructor(message) {
        super(message);
        this.name = 'language';
    }
}

module.exports = Error;
