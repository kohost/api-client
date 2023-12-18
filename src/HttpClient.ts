/* Add Use Cases Here */
import { EventEmitter } from "events";
import defs from "./utils/defs";
import axios, {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
} from "axios";

interface KohostApiClientOptions {
  url: string;
  propertyId?: string;
  organizationId?: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

interface KohostApiResponse {
  data?: any;
  error?: any;
  query?: any;
  pagination?: any;
}

class KohostApiClient extends EventEmitter {
  options: KohostApiClientOptions;
  isBrowser: boolean;
  isRefreshingToken: boolean;
  private transport: AxiosInstance;
  constructor(
    options = {
      url: "",
      propertyId: "",
      organizationId: "",
      apiKey: "",
      headers: {},
    } as KohostApiClientOptions
  ) {
    super();
    if (!options.url) throw new Error("options.url is required");
    this.options = options;
    this.isBrowser = typeof window !== "undefined";
    this.isRefreshingToken = false;

    const config: AxiosRequestConfig = {
      baseURL: options.url,
      responseType: "json",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    };

    if (!config.headers) config.headers = {};

    if (options.apiKey) {
      config.headers[defs.HEADER_KEY_API_KEY] = options.apiKey;
    }

    if (options.propertyId) {
      config.headers[defs.HEADER_KEY_PROPERTY_ID] = options.propertyId;
    }

    if (options.organizationId) {
      config.headers[defs.HEADER_KEY_ORGANIZATION_ID] = options.organizationId;
    }

    this.transport = axios.create(config);

    this.transport.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleResponseError.bind(this)
    );
  }

  /**
   * @param {string} orgId
   * @returns {void}
   * @memberof KohostApiClient
   * @example
   * client.organizationId = "1234";
   */
  set organizationId(orgId: string) {
    const key = defs.HEADER_KEY_ORGANIZATION_ID;
    this.transport.defaults.headers.common[key] = orgId;
  }

  /**
   * @param {string} propertyId
   * @returns {void}
   * @memberof KohostApiClient
   * @example
   * client.propertyId = "1234";
   */

  set propertyId(propertyId: string) {
    const key = defs.HEADER_KEY_PROPERTY_ID;
    this.transport.defaults.headers.common[key] = propertyId;
  }

  handleResponse(response: AxiosResponse): AxiosResponse | Promise<any> {
    try {
      if (response.data.data) {
        response.data = response.data.data;
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  handleResponseError(error: AxiosError) {
    const { config: originalReq } = error;
    if (!error.response) return Promise.reject(error);

    const data = error.response.data as KohostApiResponse;
    const status: number = error.response.status;

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

      if (expectedError && newTokensNeeded && originalReq) {
        while (!this.isRefreshingToken) {
          this.isRefreshingToken = true;
          return this.RefreshToken()
            .then(() => {
              // retry the original request with the new token
              this.isRefreshingToken = false;
              return this.transport(originalReq);
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

    return Promise.reject(error);
  }

  _onLoginRequired() {
    this.emit("LoginRequired");
  }

  _onPhoneVerificationRequired() {
    this.emit("PhoneVerificationRequired");
  }
}

export default KohostApiClient;
