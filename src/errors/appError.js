export class AppError extends Error {
  constructor(message = "Internal Server Error", options) {
    super(message, options);
    this.type = this.constructor.name;
    this.statusCode = 500;
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
