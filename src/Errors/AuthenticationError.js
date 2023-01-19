const AppError = require("./AppError");

module.exports = class AuthenticationError extends AppError {
  constructor(message = "Authentication Error", options = {}) {
    super(message, options);
    this.statusCode = 401;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
};
