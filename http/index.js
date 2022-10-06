const { EventEmitter } = require("events");
const axios = require("axios");
const defs = require("../defs").http;
const handleResponseError = require("./handleResponseError");
const handleResponseSuccess = require("./handleResponseSuccess");

const useCases = require("../useCases/http.json");

function useCaseMethodFactory(Client) {
  const map = new Map(useCases);
  for (const [useCase, data] of map.entries()) {
    if (data.http) {
      const { method, path } = data.http;
      Client.prototype[useCase] = function (options) {
        if (!options) options = {};

        // get parameters from path
        const pathParams = path.match(/:[a-zA-Z0-9]+/g);

        const { data, params, query, headers } = options;

        //replace path parameters with values from params
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
      };
    }
  }
}

class KohostApiClient extends EventEmitter {
  constructor(
    options = {
      url: "",
      tenant: "",
      headers: {},
    }
  ) {
    super();
    if (!options.url) throw new Error("options.url is required");
    if (!options.tenant) throw new Error("options.tenant is required");
    this.options = options;
    this.isBrower = typeof window !== "undefined";
    this._http = axios.create({
      baseURL: options.url,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        [defs.tenantHeader]: options.tenant,
        ...options.headers,
      },
    });

    this._http.interceptors.response.use(handleResponseError.bind(this));
    this._http.interceptors.response.use(handleResponseSuccess.bind(this));

    this._http.interceptors.request.use((config) => {
      config.headers[defs.authTokenHeader] = this.authToken;
      return config;
    });
  }

  get lsTokenKey() {
    return `${this.options.tenant}_${defs.authTokenHeader}`;
  }

  get authToken() {
    if (this.isBrower) {
      // get token from localStorage
      return localStorage.getItem(this.lsTokenKey);
    } else {
      return this._authToken;
    }
  }

  set authToken(token) {
    if (this.isBrower) {
      localStorage.setItem(this.lsTokenKey, token);
    } else {
      this._authToken = token;
    }
  }
}

useCaseMethodFactory(KohostApiClient);

// const Kohost = new KohostApiClient({
//   url: "http://localhost:3000/v3",
//   tenant: "development",
// });

// setTimeout(() => {
//   Kohost.DescribeThermostat({ params: { id: "cQbXo7EO", roomId: "nrB6juLY" } })
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// }, 5000);

module.exports = KohostApiClient;
