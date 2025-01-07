import { AppError } from "./appError";

export class UnprocessableRequestError extends AppError {
  constructor(message = "Unprocessable Request Error", options = {}) {
    super(message, options);
    this.statusCode = 422;
    this.name = "UnprocessableRequestError";
    Object.setPrototypeOf(this, UnprocessableRequestError.prototype);
  }
}
