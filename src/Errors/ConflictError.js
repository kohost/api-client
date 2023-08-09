const AppError = require("./AppError");

module.exports = class ConflictError extends AppError {
  constructor(message = "Bad Request", options = {}) {
    super(message, options);
    this.statusCode = 409;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
};
