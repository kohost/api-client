module.exports = function handleResponseSuccess(response) {
  if (response?.data?.data) {
    response.query = response.data.query;
    response.pagination = response.data.pagination;
    response.data = response.data.data;
  }
  return response;
};
