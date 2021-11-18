function handleHTTPError(error) {
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
          response.headers[this.authTokenKey]
        ) {
          const newToken = response.headers[this.authTokenKey];
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
}

function handleHTTPResponse(response) {
  if (response && response.data && response.data.data) {
    response.query = response.data.query;
    response.pagination = response.data.pagination;
    response.data = response.data.data;
  }
  return response;
}

function handleGenerateConfig(config) {
  if (this.config.secretKey && this.config.clientId) {
    config.headers["clientId"] = this.config.clientId;
    config.headers["secretKey"] = this.config.secretKey;
  } else config.headers[this.authTokenKey] = this.getAuthToken();
  return config;
}

export default {
  handleHTTPError,
  handleHTTPResponse,
  handleGenerateConfig,
};
