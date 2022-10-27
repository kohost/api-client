const defs = require("../defs").http;

module.exports = function handleResponseError(error) {
  const { config: originalReq } = error;
  if (!error.response) return Promise.reject(error);
  const { status, data } = error.response;
  const errorCode = data && data.error && data.error.code;
  const errorMessage = data && data.error && data.error.message;

  try {
    const expectedError = status >= 400 && status < 500;

    if (errorMessage && errorMessage === "Login Required") {
      this.onLoginRequired();
      return Promise.reject(error);
    }

    // prettier-ignore
    const newTokensNeeded = expectedError && errorCode === 1004 && status === 401;

    if (status === 401 && !newTokensNeeded) {
      return Promise.reject(error);
    }
    if (status === 400 && errorCode === 1010) {
      this.onLoginRequired();
      return Promise.reject(error);
    }

    if (newTokensNeeded) {
      return this.RefreshToken({
        headers: {
          [defs.refreshTokenHeader]: this.refreshToken,
        },
      }).then((response) => {
        // update headers with the new tokens
        if (
          response &&
          response.headers &&
          response.headers[this.authTokenHeaderKey]
        ) {
          const newToken = response.headers[this.authTokenHeaderKey];
          originalReq.headers[defs.authTokenHeader] = newToken;
          this.authToken = newToken;
          return this.http(originalReq);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }

  return Promise.reject(error);
};
