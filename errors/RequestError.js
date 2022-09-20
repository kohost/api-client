const AppError = require("./AppError");

module.exports = class RequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = 400;
    this.code = 400;
    Object.setPrototypeOf(this, RequestError.prototype);
  }
};
