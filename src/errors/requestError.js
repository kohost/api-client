import AppError from "./appError";

export default class RequestError extends AppError {
  constructor(message = "Bad Request", options = {}) {
    super(message, options);
    this.statusCode = 400;
    this.name = "RequestError";
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
