import { AppError } from "./appError";

export class SystemCommError extends AppError {
  constructor(message = "System Communication Error", options = {}) {
    super(message, options);
    this.statusCode = 503;
    this.name = "SystemCommError";
    Object.setPrototypeOf(this, SystemCommError.prototype);
  }
}
