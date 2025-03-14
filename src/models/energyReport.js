/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateEnergyReport as validate } from "../validate";

/**
 * @typedef {Object} EnergyReportData Hourly Report for Energy based on energy report shards
 * @property {string} id - Identifier of the object.
 * @property {"energyReport"} type - Default: "energyReport"
 * @property {("hourly"|"daily"|"monthly")} [reportTime]
 * @property {string} roomId - Identifier of the object.
 * @property {(string|object)} first
 * @property {(string|object)} last
 * @property {{id: string, type: ("alarm"|"dimmer"|"switch"|"motionSensor"|"windowCovering"|"camera"|"mediaSource"|"thermostat"|"lock"|"courtesy"|"gateway"|"tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"uncontrolledDevice"), kwh: number}[]} consumption
 * @property {{lights: number, climate: number, media: number}[]} totals
 * @property {number} costPerKw
 */

/**
 * Hourly Report for Energy based on energy report shards
 * @class EnergyReport
 * @extends {Entity}
 */
export class EnergyReport extends Entity {
  /**
   * @constructor
   * @param {EnergyReportData} data - The data to initialize the EnergyReport with
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    this.type = data.type;
    if (data.reportTime !== undefined) this.reportTime = data.reportTime;
    this.roomId = data.roomId;
    this.first = data.first;
    this.last = data.last;
    this.consumption = data.consumption;
    this.totals = data.totals;
    this.costPerKw = data.costPerKw;
  }
}

Object.defineProperty(EnergyReport.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "energyReport.json",
    title: "Energy Report",
    description: "Hourly Report for Energy based on energy report shards",
    type: "object",
    required: [
      "id",
      "type",
      "roomId",
      "first",
      "last",
      "consumption",
      "totals",
      "costPerKw",
    ],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { type: "string", enum: ["energyReport"], default: "energyReport" },
      reportTime: { type: "string", enum: ["hourly", "daily", "monthly"] },
      roomId: { $ref: "definitions.json#/definitions/id" },
      first: { type: ["string", "object"], format: "date-time" },
      last: { type: ["string", "object"], format: "date-time" },
      consumption: {
        type: "array",
        items: {
          type: "object",
          required: ["id", "type", "kwh"],
          properties: {
            id: { $ref: "definitions.json#/definitions/id" },
            type: { $ref: "definitions.json#/definitions/type" },
            kwh: { type: "number", minimum: 0 },
          },
        },
      },
      totals: {
        type: "array",
        items: {
          type: "object",
          required: ["lights", "climate", "media"],
          properties: {
            lights: { type: "number", minimum: 0 },
            climate: { type: "number", minimum: 0 },
            media: { type: "number", minimum: 0 },
          },
        },
      },
      costPerKw: { type: "number", minimum: 0 },
    },
  },
});

Object.defineProperty(EnergyReport.prototype, "validator", {
  get: function () {
    return validate;
  },
});
