import AppError from "./AppError";

export default class ValidationError extends AppError {
  constructor(message = "Validation Error", options = {}) {
    super(message, options);
    this.statusCode = 400;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
