/* Add Use Cases Here */
const { EventEmitter } = require("events");

/*
  Creates methods for each use case in the API

  @param {Object} Client - The client class
  @returns undefined
*/

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
          [KohostApiClient.defs.propertyHeader]: options.propertyId,
          ...options.headers,
        },
      });

      this._http.interceptors.response.use(
        this._handleResponse,
        this._handleResponseError
      );

      this._http.interceptors.request.use((config) => {
        if (!this.isBrowser) {
          config.headers[KohostApiClient.defs.authTokenHeader] = this.authToken;
        }
        return config;
      });
      this._init = true;
    });
  }

  static get defs() {
    return {
      authTokenHeader: "X-Auth-Token",
      refreshTokenHeader: "X-Refresh-Token",
      propertyHeader: "X-Property-Id",
    };
  }

  _handleResponse(response) {
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
  }

  _handleResponseError(error) {
    const { config: originalReq } = error;
    if (!error.response) return Promise.reject(error);
    const { status, data } = error.response;
    const errorType = data?.error?.type;
    const errorMessage = data?.error?.message;

    try {
      const expectedError = status >= 400 && status < 500;
      const newTokensNeeded =
        expectedError && errorType === "TokenExpiredError";

      if (expectedError && errorMessage === "Login Required") {
        this._onLoginRequired();
        return Promise.reject(error);
      }

      if (expectedError && errorMessage === "No token provided") {
        this._onLoginRequired();
        return Promise.reject(error);
      }

      if (expectedError && newTokensNeeded) {
        return this.RefreshToken().then(() => {
          // retry the original request with the new token
          return this.http(originalReq);
        });
      }
    } catch (error) {
      console.log(error);
    }

    return Promise.reject(error);
  }

  get authTokenHeaderKey() {
    return KohostApiClient.defs.authTokenHeader.toLowerCase();
  }

  get refreshTokenHeaderKey() {
    return KohostApiClient.defs.refreshTokenHeader.toLowerCase();
  }

  get lsTokenKey() {
    return `${this.options.propertyId}_${KohostApiClient.defs.authTokenHeader}`;
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

  _onLoginRequired() {
    this.emit("LoginRequired");
  }
}

module.exports = KohostApiClient;
