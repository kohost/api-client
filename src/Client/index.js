/* Add Use Cases Here */
const { EventEmitter } = require("events");
const axios = require("axios");

class KohostApiClient extends EventEmitter {
  #onSuccess;
  #onError;

  /** 
  @param {Object} options - The options to create the client
  @param {String} options.organizationId - The organization ID
  @param {String} options.propertyId - The property ID
  @param {String} options.url - The base URL for the API endpint
  @param {Object} options.headers - Additional headers to send with each request
  @param {String} options.apiKey - The API key to use for requests
  @param {Function} options.onSuccess - A callback to handle successful responses
  @param {Function} options.onError - A callback to handle errors
  */
  constructor(
    options = {
      url: "",
      propertyId: "",
      organizationId: "",
      apiKey: "",
      headers: {},
      onSuccess: (response) => response,
      onError: (error) => error,
    },
  ) {
    super();
    if (!options.url) throw new Error("options.url is required");
    this.options = options;
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

    this.#onSuccess = options.onSuccess
      ? options.onSuccess
      : (response) => response;

    this.#onError = options.onError ? options.onError : (error) => error;

    this._http = axios.create(config);

    this._http.interceptors.response.use(
      this.#handleResponse.bind(this),
      this.#handleResponseError.bind(this),
    );
  }

  /**
   * @param {string} orgId
   * @returns {void}
   * @memberof KohostApiClient
   * @example
   * client.organizationId = "1234";
   */
  set organizationId(orgId) {
    const key = KohostApiClient.defs.organizationHeader;
    this._http.defaults.headers.common[key] = orgId;
  }

  get organizationId() {
    const key = KohostApiClient.defs.organizationHeader;
    return this._http.defaults.headers.common[key];
  }

  /**
   * @param {string} propertyId
   * @returns {void}
   * @memberof KohostApiClient
   * @example
   * client.propertyId = "1234";
   */

  set propertyId(propertyId) {
    const key = KohostApiClient.defs.propertyHeader;
    this._http.defaults.headers.common[key] = propertyId;
  }

  get propertyId() {
    const key = KohostApiClient.defs.propertyHeader;
    return this._http.defaults.headers.common[key];
  }

  static get defs() {
    return {
      apiKeyHeader: "X-Api-Key",
      propertyHeader: "X-Property-Id",
      organizationHeader: "X-Organization-Id",
    };
  }

  #onLoginRequired() {
    this.emit("LoginRequired");
  }

  #onPhoneVerificationRequired() {
    this.emit("PhoneVerificationRequired");
  }

  #handleResponse(response) {
    try {
      if (response?.data?.data) {
        response.query = response.data.query;
        response.pagination = response.data.pagination;
        response.data = response.data.data;
      }

      response = this.#onSuccess(response);

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  #handleResponseError(error) {
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
        this.#onPhoneVerificationRequired();
        return Promise.reject(error);
      }

      if (expectedError && errorMessage === "Login Required") {
        this.#onLoginRequired();
        return Promise.reject(error);
      }

      if (
        expectedError &&
        errorMessage === "No auth header or cookie provided"
      ) {
        this.#onLoginRequired();
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

    error = this.#onError(error);

    return Promise.reject(error);
  }
}

module.exports = KohostApiClient;
