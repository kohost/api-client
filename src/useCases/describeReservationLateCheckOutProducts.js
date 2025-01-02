/** 
				Creates a method for each use case in the API
				@memberof KohostApiClient
				@param {Object} requestData - The options to send to the API
				@param {Object} requestData.headers - The headers to send to the API
				@param {Object} requestData.data - The body to send to the API. Valid for POST and PUT requests
				@param {Object} requestData.query - The query for the request to build the URL
				@returns {Promise} The response from the API
			  */

 
export function DescribeReservationLateCheckOutProducts(
  requestData = { data: null, query: null, headers: null },
  httpConfigOptions = {},
) {
  if (!requestData) requestData = {};

  // get parameters from path
  const pathParams = [":id"];

  const { data, query, headers } = requestData;

  // replace path parameters with values from params
  let url = "/reservations/:id/products/lateCheckOut";
  if (pathParams && data) {
    for (const param of pathParams) {
      const paramName = param.replace(":", "");
      url = url.replace(param, data[paramName]);
    }
  }

  // make sure all parameters have been replaced
  if (url.match(/:[a-zA-Z0-9]+/g)) {
    const missingParams = url.match(/:[a-zA-Z0-9]+/g);
    // remove the colon from the parameter name
    const missing = missingParams.map((param) => param.replace(":", ""));
    return Promise.reject(
      new Error("Missing parameters: " + missing.join(", ")),
    );
  }

  const config = {
    method: "get",
    url: url,
    ...httpConfigOptions,
  };

  if (data) config.data = data;
  if (query) config.params = query;
  if (headers) config.headers = headers;

  return this._http.request(config);
}
