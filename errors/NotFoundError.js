const AppError = require("./AppError");

module.exports = class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super(message);
    this.statusCode = 404;
    this.code = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
};
