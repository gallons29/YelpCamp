class ExpressError extends Error {
    constructor(message, statusCode) {
        super(); //chiama Error constructor
        this.message = message;
        this.statusCode = statusCode
    }
}

module.exports = ExpressError;