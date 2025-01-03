 
/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

export class CreateAnnouncementCommand {
  /**
   * @description
   * @constructor
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
    const pathParams = CreateAnnouncementCommand.params;

    const { data, query, headers } = commandConfig;

    // replace path parameters with values from params
    let url = CreateAnnouncementCommand.url;

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

    /**
     * The full URL for the use case
     * @type {string}
     */
    this.url = url;
    /**
     * The data to send with the use case
     * @type {object | null}
     */
    this.data = data;
    /**
     * The query parameters for the use case
     * @type {object | null}
     */
    this.query = query;
    /**
     * The headers for the use case
     * @type {object | null}
     */
    this.headers = headers;

    const config = {
      method: CreateAnnouncementCommand.method,
      url: url,
      ...options,
    };

    if (data) config.data = data;
    if (query) config.params = query;
    if (headers) config.headers = headers;

    /**
     * The configuration for the use case command
     * @type {{ url: string, method: "get" | "put" | "post" | "delete", data?: object | null, query?: object | null, headers?: object | null }}
     */
    this.config = config;
  }

  /**
   * The required parameters for the use case
   * @type {string[]}
   */
  static get params() {
    return [];
  }

  /**
   * The URL for the use case, with path parameters
   * @type {string}
   */
  static get url() {
    return "/announcements";
  }

  /**
   * The HTTP method for the use case
   * @type {"get" | "put" | "post" | "delete"}
   */
  static get method() {
    return "post";
  }
}
