const AppError = require("./AppError");

module.exports = class UnprocessableRequestError extends AppError {
  constructor(message = "Unprocessable Request Error", options = {}) {
    super(message, options);
    this.statusCode = 422;
    Object.setPrototypeOf(this, UnprocessableRequestError.prototype);
  }
};
