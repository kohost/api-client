const defs = require("../defs").http;

module.exports = function handleResponseError(error) {
  const { config: originalReq } = error;
  if (!error.response) return Promise.reject(error);
  const { status, data } = error.response;
  const errorCode = data && data.error && data.error.code;
  const errorMessage = data && data.error && data.error.message;

  try {
    const expectedError = status >= 400 && status < 500;
    if (!expectedError) this.handleLogAndNotifyError(error);

    if (errorMessage && errorMessage === "Login Required") {
      this.handleLoginRequired();
      return Promise.reject(error);
    }

    // prettier-ignore
    const newTokensNeeded = expectedError && errorCode === 1004 && status === 401

    if (status === 401 && !newTokensNeeded) {
      return Promise.reject(error);
    }
    if (status === 400 && errorCode === 1010) {
      this.handleLoginRequired();
      return Promise.reject(error);
    }

    if (newTokensNeeded) {
      return this.Auth.requestNewTokens().then((response) => {
        // update headers with the new tokens
        if (
          response &&
          response.headers &&
          response.headers[defs.authTokenHeader]
        ) {
          const newToken = response.headers[defs.authTokenHeader];
          originalReq.headers[this.authTokenKey] = newToken;
          this.handleNewToken(newToken);
          return this.http(originalReq);
        }
      });
    }
  } catch (error) {
    this.handleLogAndNotifyError(error);
  }

  return Promise.reject(error);
};
