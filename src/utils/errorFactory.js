const Errors = require("../Errors");

module.exports = function errorFactory(errName) {
  switch (errName) {
    case "AppError":
      return Errors.AppError;
    case "AuthenticationError":
      return Errors.AuthenticationError;
    case "AuthorizationError":
      return Errors.AuthorizationError;
    case "ConflictError":
      return Errors.ConflictError;
    case "DeviceCommError":
      return Errors.DeviceCommError;
    case "LoginError":
      return Errors.LoginError;
    case "NotFoundError":
      return Errors.NotFoundError;
    case "RequestError":
      return Errors.RequestError;
    case "SystemCommError":
      return Errors.SystemCommError;
    case "TokenExpiredError":
      return Errors.TokenExpiredError;
    case "UnprocessableRequestError":
      return Errors.UnprocessableRequestError;
    case "ValidationError":
      return Errors.ValidationError;
    default:
      return new Error("Invalid error name: " + errName);
  }
};
