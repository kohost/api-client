const AppError = require("./AppError");

module.exports = class TokenExpiredError extends AppError {
  constructor(message = "Token Expired") {
    super(message);
    this.statusCode = 401;
    this.code = 1004;
    Object.setPrototypeOf(this, TokenExpiredError.prototype);
  }
};
