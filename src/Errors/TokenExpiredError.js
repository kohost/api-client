const AppError = require("./AppError");

module.exports = class TokenExpiredError extends AppError {
  constructor(message = "Token Expired", options = {}) {
    super(message, options);
    this.statusCode = 401;
    this.name = "TokenExpiredError";
    Object.setPrototypeOf(this, TokenExpiredError.prototype);
  }
};
