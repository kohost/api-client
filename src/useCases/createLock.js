export class CreateLockCommand {
  /**
   * @param {Object} commandConfig - The configuration for the use case command
   * @param {Object} commandConfig.headers - The headers to include in the command
   * @param {Object} commandConfig.data - The body to include in the command
   * @param {Object} commandConfig.query - The query parameters to include in the command
   *
   * @param {Object} options - The options to include in the command
   */
  constructor(
    commandConfig = { data: null, query: null, headers: null },
    options = {},
  ) {
    // get parameters from path
    const pathParams = CreateLockCommand.params;

    const { data, query, headers } = commandConfig;

    // replace path parameters with values from params
    let url = CreateLockCommand.url;

    if (pathParams && data) {
      for (const param of pathParams) {
        url = url.replace(param, data[param]);
      }
    }

    // make sure all parameters have been replaced
    if (url.match(/:[a-zA-Z0-9]+/g)) {
      const missingParams = url.match(/:[a-zA-Z0-9]+/g);
      // remove the colon from the parameter name
      const missing = missingParams.map((param) => param.replace(":", ""));
      throw new Error("Missing parameters: " + missing.join(", "));
    }

    this.url = url;
    this.data = data;
    this.query = query;
    this.headers = headers;

    const config = {
      method: CreateLockCommand.method,
      url: url,
      ...options,
    };

    if (data) config.data = data;
    if (query) config.params = query;
    if (headers) config.headers = headers;

    this.config = config;
  }

  static get params() {
    return ["roomId"];
  }

  static get url() {
    return "/rooms/:roomId/locks";
  }

  static get method() {
    return "post";
  }
}
