const AppError = require("./AppError");

module.exports = class AuthenticationError extends AppError {
  constructor(message = "Authentication Error", options = {}) {
    super(message, options);
    this.statusCode = 401;
    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
};
