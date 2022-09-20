const AppError = require("./AppError");

module.exports = class AuthenticationError extends AppError {
  constructor(message = "Authentication Error") {
    super(message);
    this.statusCode = 401;
    this.code = 401;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
};
