module.exports = class AppError extends Error {
  constructor(message = "Internal Server Error", options) {
    super(message, options);
    this.type = this.constructor.name;
    this.statusCode = 500;
    Object.setPrototypeOf(this, AppError.prototype);
  }
};
