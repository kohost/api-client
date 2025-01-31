/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateEnergyReportShard as validate } from "../validators";

/**
 * @typedef {Object} EnergyReportShardData Shard used for Energy Reports
 * @property {string} id - Identifier of the object.
 * @property {"energyReportShard"} type - Default: "energyReportShard"
 * @property {string} roomId - Identifier of the object.
 * @property {(string|object)} first
 * @property {(string|object)} last
 * @property {{time: (string|object), watts: number, id: string, type: ("alarm"|"dimmer"|"switch"|"motionSensor"|"windowCovering"|"camera"|"mediaSource"|"thermostat"|"lock"|"courtesy"|"gateway"|"tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"uncontrolledDevice"), value: number}[]} data
 * @property {number} ndata - Default: 0
 * @property {(string|object)} expires
 */

/**
 * Shard used for Energy Reports
 * @class EnergyReportShard
 * @extends {Entity}
 */
export class EnergyReportShard extends Entity {
  /**
   * @constructor
   * @param {EnergyReportShardData} data - The data to initialize the EnergyReportShard with
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    this.type = data.type;
    this.roomId = data.roomId;
    this.first = data.first;
    this.last = data.last;
    this.data = data.data;
    this.ndata = data.ndata;
    this.expires = data.expires;
  }
}

Object.defineProperty(EnergyReportShard.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "energyReportShard.json",
    title: "Energy Report Shard",
    description: "Shard used for Energy Reports",
    type: "object",
    required: [
      "id",
      "type",
      "roomId",
      "first",
      "last",
      "data",
      "ndata",
      "expires",
    ],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: {
        type: "string",
        enum: ["energyReportShard"],
        default: "energyReportShard",
      },
      roomId: { $ref: "definitions.json#/definitions/id" },
      first: { type: ["string", "object"], format: "date-time" },
      last: { type: ["string", "object"], format: "date-time" },
      data: {
        type: "array",
        items: {
          type: "object",
          required: ["time", "watts", "id", "type", "value"],
          properties: {
            time: { type: ["string", "object"], format: "date-time" },
            watts: { $ref: "definitions.json#/definitions/watts" },
            id: { $ref: "definitions.json#/definitions/id" },
            type: { $ref: "definitions.json#/definitions/type" },
            value: { type: "number", minimum: 0, maximum: 1 },
          },
        },
      },
      ndata: { type: "integer", minimum: 0, maximum: 100000, default: 0 },
      expires: { type: ["string", "object"], format: "date-time" },
    },
  },
});

Object.defineProperty(EnergyReportShard.prototype, "validator", {
  get: function () {
    return validate;
  },
});
