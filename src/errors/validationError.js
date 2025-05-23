import { AppError } from "./appError";

export class ValidationError extends AppError {
  constructor(message = "Validation Error", options = {}) {
    super(message, options);
    this.statusCode = 400;
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
