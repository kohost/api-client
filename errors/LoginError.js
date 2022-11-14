const AppError = require("./AppError");

module.exports = class LoginError extends AppError {
  constructor(message = "Invalid Login information provided", options = {}) {
    super(message, options);
    this.statusCode = 401;
    Object.setPrototypeOf(this, LoginError.prototype);
  }
};
