/* Add Use Cases Here */
const { EventEmitter } = require("events");
const axios = require("axios");

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
      organizationId: "",
      apiKey: "",
      headers: {},
    }
  ) {
    super();
    if (!options.url) throw new Error("options.url is required");
    if (!options.propertyId) throw new Error("options.property is required");
    this.options = options;
    // eslint-disable-next-line no-undef
    this.isBrowser = typeof window !== "undefined";

    const config = {
      baseURL: options.url,
      responseType: "json",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        [KohostApiClient.defs.propertyHeader]: options.propertyId,
        ...options.headers,
      },
    };

    if (options.apiKey) {
      config.headers[KohostApiClient.defs.apiKeyHeader] = options.apiKey;
    }

    this._http = axios.create(config);

    this._http.interceptors.response.use(
      this._handleResponse.bind(this),
      this._handleResponseError.bind(this)
    );
  }

  static get defs() {
    return {
      apiKeyHeader: "X-Api-Key",
      propertyHeader: "X-Property-Id",
    };
  }

  _handleResponse(response) {
    try {
      if (response?.data?.data) {
        response.query = response.data.query;
        response.pagination = response.data.pagination;
        response.data = response.data.data;
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
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

      if (expectedError && errorMessage === "Phone Verification is required") {
        this._onPhoneVerificationRequired();
        return Promise.reject(error);
      }

      if (expectedError && errorMessage === "Login Required") {
        this._onLoginRequired();
        return Promise.reject(error);
      }

      if (
        expectedError &&
        errorMessage === "No auth header or cookie provided"
      ) {
        this._onLoginRequired();
        return Promise.reject(error);
      }

      if (expectedError && newTokensNeeded) {
        return this.RefreshToken().then(() => {
          // retry the original request with the new token
          return this._http(originalReq);
        });
      }
    } catch (error) {
      console.log(error);
    }

    return Promise.reject(error);
  }

  /* 
  @param {String} token - The token to set
  @returns undefined
  */

  _onLoginRequired() {
    this.emit("LoginRequired");
  }

  _onPhoneVerificationRequired() {
    this.emit("PhoneVerificationRequired");
  }
}

module.exports = KohostApiClient;
