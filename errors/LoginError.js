const AppError = require("./AppError");

module.exports = class LoginError extends AppError {
  constructor(message = "Invalid Login information provided") {
    super(message);
    this.statusCode = 401;
    this.code = 1008;
    Object.setPrototypeOf(this, LoginError.prototype);
  }
};
