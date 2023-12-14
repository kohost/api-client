import AppError from "./AppError";

export default class TokenExpiredError extends AppError {
  constructor(message = "Token Expired", options = {}) {
    super(message, options);
    this.statusCode = 401;
    Object.setPrototypeOf(this, TokenExpiredError.prototype);
  }
}
