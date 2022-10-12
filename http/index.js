const { EventEmitter } = require("events");
const axios = require("axios");
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

      function UseCase(options) {
        if (!options) options = {};

        // get parameters from path
        const pathParams = path.match(/:[a-zA-Z0-9]+/g);

        const { data, params, query, headers } = options;

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
  @param {String} options.tenantId - The tenant ID
  @param {String} options.url - The base URL for the API endpint
  @param {Object} options.headers - Additional headers to send with each request

  */
  constructor(
    options = {
      url: "",
      tenantId: "",
      headers: {},
    }
  ) {
    super();
    if (!options.url) throw new Error("options.url is required");
    if (!options.tenantId) throw new Error("options.tenant is required");
    this.options = options;
    this.isBrower = typeof window !== "undefined";
    this._http = axios.create({
      baseURL: options.url,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        [defs.tenantHeader]: options.tenantId,
        ...options.headers,
      },
    });

    this._http.interceptors.response.use(
      handleResponseSuccess.bind(this),
      handleResponseError.bind(this)
    );

    this._http.interceptors.request.use((config) => {
      config.headers[defs.authTokenHeader] = this.authToken;
      return config;
    });
  }

  get authTokenHeaderKey() {
    return defs.authTokenHeader.toLowerCase();
  }

  get refreshTokenHeaderKey() {
    return defs.refreshTokenHeader.toLowerCase();
  }

  get lsTokenKey() {
    return `${this.options.tenantId}_${defs.authTokenHeader}`;
  }

  get authToken() {
    if (this.isBrower) {
      // get token from localStorage
      return localStorage.getItem(this.lsTokenKey);
    } else {
      return this._authToken;
    }
  }

  /* 
  @param {String} token - The token to set
  @returns undefined
  */

  set authToken(token) {
    if (this.isBrower) {
      localStorage.setItem(this.lsTokenKey, token);
    } else {
      this._authToken = token;
    }
  }
}

useCaseMethodFactory(KohostApiClient);

const kohost = new KohostApiClient({
  url: "https://api.kohost.app/v3",
  tenantId: "kohost",
});

module.exports = KohostApiClient;
