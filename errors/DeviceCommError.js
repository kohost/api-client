const AppError = require("./AppError");

module.exports = class DeviceCommError extends AppError {
  constructor(message = "Device Communication Error", options = {}) {
    super(message, options);
    this.statusCode = 503;
    Object.setPrototypeOf(this, DeviceCommError.prototype);
  }
};
