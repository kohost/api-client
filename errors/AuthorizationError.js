const AppError = require("./AppError");

module.exports = class AuthorizationError extends AppError {
  constructor(message = "Authorization Error") {
    super(message);
    this.statusCode = 403;
    this.code = 403;
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
};
