class BaseResponse {
    status;
    statusCode;
    message;
    constructor(status, statusCode, message) {
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
    }
}



class SuccessResponse extends BaseResponse {
    data
    constructor(status, statusCode, message, data) {
        super(status, statusCode, message)
        this.data = data;
    }
}

class FailureResponse extends BaseResponse {
    error
    constructor(status, statusCode, message, error) {
        super(status, statusCode, message)
        this.error = data;
    }
}


module.exports = { SuccessResponse, FailureResponse }