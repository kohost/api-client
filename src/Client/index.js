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
    this.options = options;
    this.isBrowser = typeof window !== "undefined";
    this.isRefreshingToken = false;

    const config = {
      baseURL: options.url,
      responseType: "json",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    };

    if (options.apiKey) {
      config.headers[KohostApiClient.defs.apiKeyHeader] = options.apiKey;
    }

    if (options.propertyId) {
      config.headers[KohostApiClient.defs.propertyHeader] = options.propertyId;
    }

    if (options.organizationId) {
      config.headers[KohostApiClient.defs.organizationHeader] =
        options.organizationId;
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
      organizationHeader: "X-Organization-Id",
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
        while (!this.isRefreshingToken) {
          this.isRefreshingToken = true;
          return this.RefreshToken()
            .then(() => {
              // retry the original request with the new token
              this.isRefreshingToken = false;
              return this._http(originalReq);
            })
            .catch((err) => {
              this.isRefreshingToken = false;
              return Promise.reject(err);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }

    return Promise.reject(error);
  }

  _onLoginRequired() {
    this.emit("LoginRequired");
  }

  _onPhoneVerificationRequired() {
    this.emit("PhoneVerificationRequired");
  }
}

module.exports = KohostApiClient;
