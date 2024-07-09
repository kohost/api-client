/* Add Use Cases Here */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import { EventEmitter } from "events";

interface KohostApiClientOptions {
  url: string;
  propertyId: string;
  organizationId: string;
  apiKey?: string;
  headers?: RawAxiosRequestHeaders;
  onSuccess?: (response: any) => any;
  onError?: (error: any) => any;
}

class KohostApiClient extends EventEmitter {
  #onSuccess;
  #onError;
  isRefreshingToken: boolean;
  options: KohostApiClientOptions;
  _http: AxiosInstance;

  constructor(
    options: KohostApiClientOptions = {
      url: "",
      propertyId: "",
      organizationId: "",
      apiKey: "",
      headers: {},
      onSuccess: (response) => response,
      onError: (error) => error,
    }
  ) {
    super();
    if (!options.url) throw new Error("options.url is required");
    this.options = options;
    this.isRefreshingToken = false;

    const config: AxiosRequestConfig = {
      baseURL: options.url,
      responseType: "json",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        ...options.headers,
      } as RawAxiosRequestHeaders,
    };

    if (!config.headers) config.headers = {};

    if (options.apiKey && typeof options.apiKey === "string") {
      config.headers[KohostApiClient.defs.apiKeyHeader] = options.apiKey;
    }

    if (options.propertyId && typeof options.propertyId === "string") {
      config.headers[KohostApiClient.defs.propertyHeader] = options.propertyId;
    }

    if (options.organizationId && typeof options.organizationId === "string") {
      config.headers[KohostApiClient.defs.organizationHeader] =
        options.organizationId;
    }

    this.#onSuccess = options.onSuccess
      ? options.onSuccess
      : (response: AxiosResponse) => response;

    this.#onError = options.onError
      ? options.onError
      : (error: AxiosError) => error;

    this._http = axios.create(config);

    this._http.interceptors.response.use(
      this.#handleResponse.bind(this),
      this.#handleResponseError.bind(this)
    );
  }

  set organizationId(orgId: string) {
    const key = KohostApiClient.defs.organizationHeader;
    this._http.defaults.headers.common[key] = orgId;
  }

  set propertyId(propertyId: string) {
    const key = KohostApiClient.defs.propertyHeader;
    this._http.defaults.headers.common[key] = propertyId;
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

  #handleResponse(response: AxiosResponse) {
    try {
      if (response?.data?.data) {
        response.data = response.data.data;
      }

      response = this.#onSuccess(response);

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  #handleResponseError(error: AxiosError) {
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

      if (expectedError && newTokensNeeded && originalReq) {
        while (!this.isRefreshingToken) {
          this.isRefreshingToken = true;
          return this.RefreshToken()
            .then(() => {
              // retry the original request with the new token
              this.isRefreshingToken = false;
              return this._http(originalReq);
            })
            .catch((err: AxiosError) => {
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

export default KohostApiClient;
