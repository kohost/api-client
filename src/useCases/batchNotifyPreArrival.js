/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

export class BatchNotifyPreArrivalCommand {
  /**
   * @description
   * @constructor
   * @typedef {object} BatchNotifyPreArrivalCommandConfig
   * @property {{[key: string]: any}} data - The body to include in the command
   * @property {{[key:string]: any} | null} [headers] - The headers to include in the command
   * @property {{[key:string]: any} | null} [query] - The query parameters to include in the command
   *
   * @param {BatchNotifyPreArrivalCommandConfig} commandConfig - The options to include in the command
   * @param {Object} options - The options to include in the command
   */
  constructor(commandConfig, options = {}) {
    // get parameters from path
    const pathParams = BatchNotifyPreArrivalCommand.params;

    let { data, query, headers } = commandConfig ?? {};

    if (typeof data === "undefined") data = null;
    if (typeof query === "undefined") query = null;
    if (typeof headers === "undefined") headers = null;

    // replace path parameters with values from params
    let url = BatchNotifyPreArrivalCommand.url;

    if (pathParams && data) {
      for (const param of pathParams) {
        const urlParam = ":" + param;
        url = url.replace(urlParam, data[param]);
      }
    }

    // make sure all parameters have been replaced
    if (url.match(/:[a-zA-Z0-9]+/g)) {
      const missingParams = url.match(/:[a-zA-Z0-9]+/g);

      if (missingParams) {
        // remove the colon from the parameter name
        const missing = missingParams.map((param) => param.replace(":", ""));
        throw new Error("Missing parameters: " + missing.join(", "));
      }
    }

    /**
     * The full URL for the use case
     * @type {string}
     * @public
     */
    this.url = url;
    /**
     * The data to send with the use case
     * @type {BatchNotifyPreArrivalCommandConfig["data"]}
     * @public
     */
    this.data = data;
    /**
     * The query parameters for the use case
     * @type {BatchNotifyPreArrivalCommandConfig["query"]}
     * @public
     */
    this.query = query;
    /**
     * The headers for the use case
     * @type {BatchNotifyPreArrivalCommandConfig["headers"]}
     * @public
     */
    this.headers = headers;

    /**
     * The configuration for the use case command
     * @type {{ url: string, method: "post" , data: BatchNotifyPreArrivalCommandConfig["data"] , params: BatchNotifyPreArrivalCommandConfig["query"], headers: BatchNotifyPreArrivalCommandConfig["headers"] }}
     * @public
     */
    this.config = {
      method: BatchNotifyPreArrivalCommand.method,
      url: url,
      data: data,
      params: query,
      headers: headers,
      ...options,
    };
  }

  /**
   * The required parameters for the use case
   * @type {string[]}
   */
  static params = [];

  /**
   * The URL for the use case, with path parameters
   * @type {string}
   */
  static url = "/reservations/batchNotifyPreArrival";

  /**
   * The HTTP method for the use case
   * @type {"post"}
   */
  static method = "post";
}
