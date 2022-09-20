const Errors = {
  AppError: require("./AppError"),
  AuthenticationError: require("./AuthenticationError"),
  AuthorizationError: require("./AuthorizationError"),
  LoginError: require("./LoginError"),
  NotFoundError: require("./NotFoundError"),
  RequestError: require("./RequestError"),
  TokenExpiredError: require("./TokenExpiredError"),
  UnprocessableRequestError: require("./UnprocessableRequestError"),
  ValidationError: require("./ValidationError"),
};

module.exports = Errors;
