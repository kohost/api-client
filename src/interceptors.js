function handleHTTPError(error) {
  const { config: originalReq } = error;
  const { status, data } = error.response;
  const errorCode = data && data.error && data.error.code;
  try {
    const expectedError = status >= 400 && status < 500;
    if (!expectedError) this.handleLogAndNotifyError(error);

    // prettier-ignore
    const newTokensNeeded = expectedError && errorCode && ((status === 401 && errorCode === 1004) || (status === 400 && errorCode === 1009));
    if (status === 401) {
      return this.handleLoginRequired();
    }
    if (status === 400 && data && data.error && errorCode === 1010) {
      return this.handleLoginRequired();
    }

    if (newTokensNeeded) {
      return this.Auth.requestNewTokens()
        .then((response) => {
          // update headers with the new tokens
          originalReq.headers[this.authTokenKey] =
            response.headers[this.authTokenKey];
          return this.http(originalReq);
        })
        .catch(() => this.handleLoginRequired());
    }
  } catch (error) {
    this.handleLogAndNotifyError(error);
  }

  return Promise.reject(error);
}

function handleHTTPResponse(response) {
  if (response && response.data && response.data.data) {
    response.data = response.data.data;
  }
  return response;
}

function handleGenerateConfig(config) {
  config.headers[this.authTokenKey] = this.getAuthToken();
  return config;
}

export default {
  handleHTTPError,
  handleHTTPResponse,
  handleGenerateConfig,
};
