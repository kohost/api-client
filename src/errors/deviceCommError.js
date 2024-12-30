import AppError from "./appError";

export default class DeviceCommError extends AppError {
  constructor(message = "Device Communication Error", options = {}) {
    super(message, options);
    this.statusCode = 503;
    this.name = "DeviceCommError";
    Object.setPrototypeOf(this, DeviceCommError.prototype);
  }
}
