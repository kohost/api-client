/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateLog as validate } from "../validate";

/**
 * @typedef {Object} LogData
 * @property {"log"} type - Default: "log"
 * @property {number} timestamp
 * @property {string} id - Identifier of the object.
 * @property {("adlink"|"aws-kinesis"|"bacnet"|"benq"|"butler"|"comelit"|"crestron"|"dell"|"digital-watchdog"|"distech"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"newline"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"smartboard"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vivotek"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} driver - Driver used to communicate with the object.
 * @property {string} name - Event name
 * @property {{name: string, value: string}} [field1]
 * @property {string} field1.name
 * @property {string} field1.value
 * @property {{name: string, value: string}} [field2]
 * @property {string} field2.name
 * @property {string} field2.value
 * @property {{name: string, value: string}} [field3]
 * @property {string} field3.name
 * @property {string} field3.value
 * @property {{name: string, value: string}} [field4]
 * @property {string} field4.name
 * @property {string} field4.value
 * @property {{name: string, value: string}} [field5]
 * @property {string} field5.name
 * @property {string} field5.value
 * @property {{name: string, value: string}} [field6]
 * @property {string} field6.name
 * @property {string} field6.value
 */

/**
 *
 * @class Log
 * @extends {Entity}
 */
export class Log extends Entity {
  /**
   * @constructor
   * @param {LogData} data - The data to initialize the Log with
   */
  constructor(data) {
    super(data);
    this.type = data.type;
    this.timestamp = data.timestamp;
    this.id = data.id;
    this.driver = data.driver;
    this.name = data.name;
    if (data.field1 !== undefined) this.field1 = data.field1;
    if (data.field2 !== undefined) this.field2 = data.field2;
    if (data.field3 !== undefined) this.field3 = data.field3;
    if (data.field4 !== undefined) this.field4 = data.field4;
    if (data.field5 !== undefined) this.field5 = data.field5;
    if (data.field6 !== undefined) this.field6 = data.field6;
  }
}

Object.defineProperty(Log.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "log.json",
    title: "Log",
    type: "object",
    required: ["type", "timestamp", "id", "driver", "name"],
    properties: {
      type: { type: "string", default: "log", enum: ["log"] },
      timestamp: { type: "number", minimum: 1655907956593 },
      id: { $ref: "definitions.json#/definitions/id" },
      driver: { $ref: "definitions.json#/definitions/driver" },
      name: { type: "string", description: "Event name" },
      field1: {
        type: "object",
        required: ["name", "value"],
        properties: { name: { type: "string" }, value: { type: "string" } },
      },
      field2: {
        type: "object",
        required: ["name", "value"],
        properties: { name: { type: "string" }, value: { type: "string" } },
      },
      field3: {
        type: "object",
        required: ["name", "value"],
        properties: { name: { type: "string" }, value: { type: "string" } },
      },
      field4: {
        type: "object",
        required: ["name", "value"],
        properties: { name: { type: "string" }, value: { type: "string" } },
      },
      field5: {
        type: "object",
        required: ["name", "value"],
        properties: { name: { type: "string" }, value: { type: "string" } },
      },
      field6: {
        type: "object",
        required: ["name", "value"],
        properties: { name: { type: "string" }, value: { type: "string" } },
      },
    },
  },
});

Object.defineProperty(Log.prototype, "validator", {
  get: function () {
    return validate;
  },
});
