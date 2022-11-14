const AppError = require("./AppError");

module.exports = class SystemCommError extends AppError {
  constructor(message = "System Communication Error", options = {}) {
    super(message, options);
    this.statusCode = 503;
    Object.setPrototypeOf(this, SystemCommError.prototype);
  }
};
