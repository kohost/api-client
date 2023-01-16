module.exports = function handleResponseError(error) {
  const { config: originalReq } = error;
  if (!error.response) return Promise.reject(error);
  const { status, data } = error.response;
  const errorType = data?.error?.type;
  const errorMessage = data?.error?.message;

  try {
    const expectedError = status >= 400 && status < 500;
    const newTokensNeeded = expectedError && errorType === "TokenExpiredError";

    if (expectedError && errorMessage === "Login Required") {
      this.onLoginRequired();
      return Promise.reject(error);
    }

    if (expectedError && errorMessage === "No token provided") {
      this.onLoginRequired();
      return Promise.reject(error);
    }

    if (expectedError && newTokensNeeded) {
      return this.RefreshToken().then(() => {
        // retry the original request with the new token
        return this.http(originalReq);
      });
    }
  } catch (error) {
    console.log(error);
  }

  return Promise.reject(error);
};
