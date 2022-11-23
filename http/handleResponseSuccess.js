module.exports = function handleResponseSuccess(response) {
  if (response?.data?.data) {
    response.query = response.data.query;
    response.pagination = response.data.pagination;
    response.data = response.data.data;
  }
  if (!this.isBrowser && response.headers[this.authTokenHeaderKey]) {
    this.authToken = response.headers[this.authTokenHeaderKey];
  }

  if (!this.isBrowser && response.headers[this.refreshTokenHeaderKey]) {
    this.refreshToken = response.headers[this.refreshTokenHeaderKey];
  }
  return response;
};
