import { RefreshTokenCommand } from "./useCases/refreshToken";

export class KohostHTTPClient {
  #onSuccess;
  #onError;

  /** 
  @param {Object} options - The options to create the client
  @param {String} options.organizationId - The organization ID
  @param {String} options.propertyId - The property ID
  @param {String | URL} options.url - The base URL for the API endpint
  @param {String} options.apiKey - The API key to use for requests
   @param {Headers} options.headers - Additional headers to send with each request
  @param {Function} options.onSuccess - A callback to handle successful responses
  @param {Function} options.onError - A callback to handle errors
  */
  constructor(
    options = {
      url: "",
      propertyId: "",
      organizationId: "",
      apiKey: "",
      headers: new Headers({}),
      onSuccess: (response) => response,
      onError: (error) => error,
    },
  ) {
    if (!options.url) throw new Error("options.url is required");
    this.options = options;

    this.isAuthTokenRenewalActive = false;

    this.baseUrl = new URL(options.url);
    this.headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    });

    if (options.apiKey) {
      this.headers.set(KohostHTTPClient.defs.apiKeyHeader, options.apiKey);
    }

    if (options.propertyId) {
      this.propertyId = options.propertyId;
    }

    if (options.organizationId) {
      this.organizationId = options.organizationId;
    }

    this.#onSuccess = options.onSuccess
      ? options.onSuccess
      : (response) => response;

    this.#onError = options.onError ? options.onError : (error) => error;

    this.callbacks = {};
  }

  /**
   *
   * @param {"LoginRequired" | "PhoneVerificationRequired"} event
   * @param {Function} callback
   */
  on(event, callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  emit(event, ...args) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach((callback) => callback(...args));
    }
  }

  /**
   * @param {string} orgId
   * @returns {void}
   * @memberof KohostApiClient
   * @example
   * client.organizationId = "1234";
   */
  set organizationId(orgId) {
    const key = KohostHTTPClient.defs.organizationHeader;
    this.headers.set(key, orgId);
  }

  get organizationId() {
    const key = KohostHTTPClient.defs.organizationHeader;
    return this.headers.get(key);
  }

  /**
   * @param {string} propertyId
   * @returns {void}
   * @memberof KohostApiClient
   * @example
   * client.propertyId = "1234";
   */

  set propertyId(propertyId) {
    const key = KohostHTTPClient.defs.propertyHeader;
    this.headers.set(key, propertyId);
  }

  get propertyId() {
    const key = KohostHTTPClient.defs.propertyHeader;
    return this.headers.get(key);
  }

  static get defs() {
    return {
      apiKeyHeader: "X-Api-Key",
      propertyHeader: "X-Property-Id",
      organizationHeader: "X-Organization-Id",
    };
  }

  /**
   * @typedef {keyof typeof import('./useCases')} CommandName
   * @typedef {import('./useCases')[CommandName]} Command
   *
   * @param {Command} command
   */
  async send(command) {
    const commandConfig = command.config;
    const request = this.createRequest(commandConfig);
    const response = await fetch(request);

    const isJsonResponse =
      response.headers.get("Content-Type")?.includes("application/json") ||
      false;

    const responseData = isJsonResponse ? await response.json() : response.body;

    if (!response.ok) {
      let error = responseData?.error || new Error(response.statusText);

      const status = response.status;
      const errorType = responseData.error?.type;
      const errorMessage = responseData?.error?.message;

      try {
        const expectedError = status >= 400 && status < 500;
        const newTokensNeeded =
          expectedError && errorType === "TokenExpiredError";

        if (
          expectedError &&
          errorMessage === "Phone Verification is required"
        ) {
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
          while (!this.isAuthTokenRenewalActive) {
            this.isAuthTokenRenewalActive = true;
            return this.send(new RefreshTokenCommand({}))
              .then(() => {
                // retry the original request with the new token
                this.isAuthTokenRenewalActive = false;
                return this.send(command);
              })
              .catch((err) => {
                this.isAuthTokenRenewalActive = false;
                return Promise.reject(err);
              });
          }
        }
      } catch (error) {
        console.error(error);
      }

      error = this.#onError(error);

      return Promise.reject(error);
    }

    return this.#onSuccess(responseData);
  }

  #onLoginRequired() {
    this.emit("LoginRequired");
  }

  #onPhoneVerificationRequired() {
    this.emit("PhoneVerificationRequired");
  }

  /**
   * @param {Command} config
   * @returns {Request}
   */
  createRequest(config) {
    if (typeof config.headers !== "object") {
      config.headers = {};
    }

    let apiPath = config.url;

    if (apiPath.startsWith("/")) {
      apiPath = `.${apiPath}`;
    }
    const url = new URL(apiPath, this.baseUrl);
    const method = config.method.toUpperCase() || "GET";

    // Add parameters to URL if they exist
    if (config.params && typeof config.params === "object") {
      Object.entries(config.params).forEach(([key, value]) => {
        // Handle array values
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (typeof item === "object" && item !== null) {
              Object.entries(item).forEach(([itemKey, itemValue]) => {
                url.searchParams.append(`${key}[][${itemKey}]`, itemValue);
              });
            } else {
              url.searchParams.append(`${key}[]`, item);
            }
          });
        }
        // Handle null/undefined
        else if (value === null || value === undefined) {
          url.searchParams.append(key, "");
        }
        // Handle nested objects
        else if (typeof value === "object") {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            if (Array.isArray(nestedValue)) {
              nestedValue.forEach((item) => {
                url.searchParams.append(`${key}[${nestedKey}][]`, item);
              });
            } else {
              url.searchParams.append(`${key}[${nestedKey}]`, nestedValue);
            }
          });
        }
        // Handle primitive values
        else {
          url.searchParams.append(key, value);
        }
      });
    }

    const headers = new Headers(this.headers);
    // Add any additional headers
    if (config.headers) {
      Object.keys(config.headers).forEach((key) => {
        headers.set(key, config.headers[key]);
      });
    }

    const body =
      config.data !== null && ["POST", "PUT", "PATCH"].includes(method)
        ? headers.get("Content-Type") === "application/json"
          ? JSON.stringify(config.data)
          : config.data
        : undefined;

    const request = new Request(url, {
      method: method,
      headers: headers,
      credentials: "include",
      body: body,
    });

    return request;
  }
}
