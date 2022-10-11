module.exports = function handleResponseSuccess(response) {
  if (response?.data?.data) {
    response.query = response.data.query;
    response.pagination = response.data.pagination;
    response.data = response.data.data;
  }
  if (response.headers[this.authTokenHeaderKey]) {
    this.authToken = response.headers[this.authTokenHeaderKey];
  }

  if (response.headers[this.refreshTokenHeaderKey]) {
    this.refreshToken = response.headers[this.refreshTokenHeaderKey];
  }
  return response;
};
