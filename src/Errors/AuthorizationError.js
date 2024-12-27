import AppError from "./AppError";

export default class AuthorizationError extends AppError {
  constructor(message = "Authorization Error", options = {}) {
    super(message, options);
    this.statusCode = 403;
    this.name = "AuthorizationError";
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
