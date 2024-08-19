import { AppError } from "./AppError";
export class AuthenticationError extends AppError {
  constructor(message = "Authentication Error", options = {}) {
    super(message, options);
    this.statusCode = 401;
    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export default AuthenticationError;
