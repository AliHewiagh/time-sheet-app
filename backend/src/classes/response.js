class Response {
    constructor({ code, message, data, action, devError }) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.action = action;
        this.devError = devError;
    }
}

module.exports = Response;
