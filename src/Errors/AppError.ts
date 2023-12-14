export default class AppError extends Error {
  public type: string;
  public statusCode: number;
  constructor(message = "Internal Server Error", options: any) {
    super(message, options);
    this.type = this.constructor.name;
    this.statusCode = 500;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
