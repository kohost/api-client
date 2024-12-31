import { AppError } from "./appError";

export class AuthenticationError extends AppError {
  constructor(message = "Authentication Error", options = {}) {
    super(message, options);
    this.statusCode = 401;
    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
