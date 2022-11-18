const AppError = require("./AppError");

module.exports = class NotFoundError extends AppError {
  constructor(message = "Resource Not Found", options = {}) {
    super(message, options);
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
};
