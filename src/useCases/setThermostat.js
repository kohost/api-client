 
/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

export class SetThermostatCommand {
  /**
   * @description
   * @constructor
   * @typedef {object} SetThermostatCommandConfig
   * @property {{[key: string]: any, roomId: string, id: string}} data - The body to include in the command
   * @property {{[key:string]: any} | null} [headers] - The headers to include in the command
   * @property {{[key:string]: any} | null} [query] - The query parameters to include in the command
   *
   * @param {SetThermostatCommandConfig} commandConfig - The options to include in the command
   * @param {Object} options - The options to include in the command
   */
  constructor(commandConfig, options = {}) {
    // get parameters from path
    const pathParams = SetThermostatCommand.params;

    let { data, query, headers } = commandConfig ?? {};

    if (typeof data === "undefined") data = null;
    if (typeof query === "undefined") query = null;
    if (typeof headers === "undefined") headers = null;

    // replace path parameters with values from params
    let url = SetThermostatCommand.url;

    if (pathParams && data) {
      for (const param of pathParams) {
        url = url.replace(param, data[param]);
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
     * @type {SetThermostatCommandConfig["data"]}
     * @public
     */
    this.data = data;
    /**
     * The query parameters for the use case
     * @type {SetThermostatCommandConfig["query"]}
     * @public
     */
    this.query = query;
    /**
     * The headers for the use case
     * @type {SetThermostatCommandConfig["headers"]}
     * @public
     */
    this.headers = headers;

    /**
     * The configuration for the use case command
     * @type {{ url: string, method: "post" , data: SetThermostatCommandConfig["data"] , params: SetThermostatCommandConfig["query"], headers: SetThermostatCommandConfig["headers"] }}
     * @public
     */
    this.config = {
      method: SetThermostatCommand.method,
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
  static params = ["roomId", "id"];

  /**
   * The URL for the use case, with path parameters
   * @type {string}
   */
  static url = "/rooms/:roomId/thermostats/:id";

  /**
   * The HTTP method for the use case
   * @type {"post"}
   */
  static method = "post";
}
