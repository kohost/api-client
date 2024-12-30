import AppError from "./appError";

export default class LoginError extends AppError {
  constructor(message = "Invalid Login information provided", options = {}) {
    super(message, options);
    this.statusCode = 401;
    this.name = "LoginError";
    Object.setPrototypeOf(this, LoginError.prototype);
  }
}
