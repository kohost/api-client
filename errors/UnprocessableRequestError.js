const AppError = require("./AppError");

module.exports = class UnprocessableRequestError extends AppError {
  constructor(message = "Unprocessable Request Error") {
    super(message);
    this.statusCode = 422;
    this.code = 1022;
    Object.setPrototypeOf(this, UnprocessableRequestError.prototype);
  }
};
