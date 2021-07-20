class Response {
    constructor(code, message, data) {
        this.code = code;
        if (message) {
            this.message = message;
        }
        this.data = data;
    }
}

module.exports = Response;
