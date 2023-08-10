const Errors = {
  AppError: require("./AppError"),
  AuthenticationError: require("./AuthenticationError"),
  AuthorizationError: require("./AuthorizationError"),
  ConflictError: require("./ConflictError"),
  DeviceCommError: require("./DeviceCommError"),
  LoginError: require("./LoginError"),
  NotFoundError: require("./NotFoundError"),
  RequestError: require("./RequestError"),
  SystemCommError: require("./SystemCommError"),
  TokenExpiredError: require("./TokenExpiredError"),
  UnprocessableRequestError: require("./UnprocessableRequestError"),
  ValidationError: require("./ValidationError"),
};

module.exports = Errors;
