import AppError from "./AppError";

export default class UnprocessableRequestError extends AppError {
  constructor(message = "Unprocessable Request Error", options = {}) {
    super(message, options);
    this.statusCode = 422;
    this.name = "UnprocessableRequestError";
    Object.setPrototypeOf(this, UnprocessableRequestError.prototype);
  }
}
