const AppError = require("./AppError");

module.exports = class ValidationError extends AppError {
  constructor(message = "Validation Error", options) {
    super(message, options);
    this.statusCode = 400;
    this.code = 1007;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
};
