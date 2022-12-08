const { EventEmitter } = require("events");
const defs = require("../defs").http;
const handleResponseError = require("./handleResponseError");
const handleResponseSuccess = require("./handleResponseSuccess");

const useCases = require("../useCases/http.json");

/*
Creates methods for each use case in the API

@param {Object} Client - The client class
@returns undefined
*/

function useCaseMethodFactory(Client) {
  const map = new Map(useCases);
  for (const [useCase, data] of map.entries()) {
    if (data.http) {
      const { method, path } = data.http;

      /* 
        Creates a method for each use case in the API
        @param {Object} options - The options to send to the API
        @param {Object} options.headers - The headers to send to the API
        @param {Object} options.params - The params for the reuquest to build the URL
        @param {Object} options.data - The body to send to the API. Valid for POST and PUT requests
        @parms {Object} options.query - The query for the request to build the URL
        @returns {Promise} The response from the API
      */

      //eslint-disable-next-line no-inner-declarations
      function UseCase(requestData, options = {}) {
        if (!this._init) {
          // wait a second for the client to initialize
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(UseCase.call(this, requestData));
            }, 500);
          });
        }
        if (!requestData) requestData = {};

        // get parameters from path
        const pathParams = path.match(/:[a-zA-Z0-9]+/g);

        const { data, params, query, headers } = requestData;

        // replace path parameters with values from params
        let url = path;
        if (pathParams && params) {
          for (const param of pathParams) {
            const paramName = param.replace(":", "");
            url = url.replace(param, params[paramName]);
          }
        }

        // make sure all parameters have been replaced
        if (url.match(/:[a-zA-Z0-9]+/g)) {
          const missingParams = url.match(/:[a-zA-Z0-9]+/g);
          // remove the colon from the parameter name
          const missing = missingParams.map((param) => param.replace(":", ""));
          return Promise.reject(
            new Error(`Missing parameters: ${missing.join(", ")}`)
          );
        }

        const config = {
          method: method.toLowerCase(),
          url: url,
          ...options,
        };

        if (data) config.data = data;
        if (query) config.params = query;
        if (headers) config.headers = headers;

        return this._http.request(config);
      }

      Client.prototype[useCase] = UseCase;
    }
  }
}

class KohostApiClient extends EventEmitter {
  /* 
  @param {Object} options - The options to create the client
  @param {String} options.propertyId - The property ID
  @param {String} options.url - The base URL for the API endpint
  @param {Object} options.headers - Additional headers to send with each request

  */
  constructor(
    options = {
      url: "",
      propertyId: "",
      headers: {},
    }
  ) {
    super();
    if (!options.url) throw new Error("options.url is required");
    if (!options.propertyId) throw new Error("options.property is required");
    this.options = options;
    // eslint-disable-next-line no-undef
    this.isBrowser = typeof window !== "undefined";
    this._init = false;

    import("axios").then((axiosModule) => {
      const axios = axiosModule.default;
      this._http = axios.create({
        baseURL: options.url,
        responseType: "json",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          [defs.propertyHeader]: options.propertyId,
          ...options.headers,
        },
      });

      this._http.interceptors.response.use(
        handleResponseSuccess.bind(this),
        handleResponseError.bind(this)
      );

      this._http.interceptors.request.use((config) => {
        if (!this.isBrowser) {
          config.headers[defs.authTokenHeader] = this.authToken;
        }
        return config;
      });
      this._init = true;
    });
  }

  get authTokenHeaderKey() {
    return defs.authTokenHeader.toLowerCase();
  }

  get refreshTokenHeaderKey() {
    return defs.refreshTokenHeader.toLowerCase();
  }

  get lsTokenKey() {
    return `${this.options.propertyId}_${defs.authTokenHeader}`;
  }

  get authToken() {
    return this._authToken;
  }

  /* 
  @param {String} token - The token to set
  @returns undefined
  */

  set authToken(token) {
    this._authToken = token;
  }
}

useCaseMethodFactory(KohostApiClient);

module.exports = KohostApiClient;
