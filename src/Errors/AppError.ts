export default class AppError extends Error {
  statusCode: number;
  type: string;
  name: string;
  constructor(message = "Internal Server Error", options: ErrorOptions) {
    super(message, options);
    this.type = this.constructor.name;
    this.statusCode = 500;
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
