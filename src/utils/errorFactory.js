const Errors = require("../Errors");

module.exports = function errorFactory(err) {
  switch (err.type) {
    case "AppError":
      return new Errors.AppError(err.message);

    case "AuthenticationError":
      return new Errors.AuthenticationError(err.message);

    case "AuthorizationError":
      return new Errors.AuthorizationError(err.message);

    case "DeviceCommError":
      return new Errors.DeviceCommError(err.message);

    case "LoginError":
      return new Errors.LoginError(err.message);

    case "NotFoundError":
      return new Errors.NotFoundError(err.message);

    case "RequestError":
      return new Errors.RequestError(err.message);

    case "SystemCommError":
      return new Errors.SystemCommError(err.message);

    case "TokenExpiredError":
      return new Errors.TokenExpiredError(err.message);

    case "UnprocessableRequestError":
      return new Errors.UnprocessableRequestError(err.message);

    case "ValidationError":
      return new Errors.ValidationError(err.message);

    default:
      return new Error(err.message);
  }
};
