/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateDiscoveredDevice as validate } from "../validators";

export class DiscoveredDevice extends Entity {
  /**
   * @typedef {Object} DiscoveredDeviceData A device that has been discovered by Kohost, but not yet added to the Kohost system.
   * @property {string} [id] - Identifier of the object.
   * @property {string} name
   * @property {string} deviceId
   * @property {"discoveredDevice"} [type] - Default: "discoveredDevice"
   * @property {("alarm"|"dimmer"|"switch"|"motionSensor"|"windowCovering"|"camera"|"mediaSource"|"thermostat"|"lock"|"courtesy"|"gateway"|"tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"uncontrolledDevice")} [discriminator]
   * @property {string} [driver]
   * @property {object} deviceData
   * @property {boolean} [ignore]
   * @property {string} [organizationId] - Reference (id) to the organization that owns this device
   * @property {string} [propertyId] - Reference (id) to the property that this device belongs to
   */

  /**
   * @param {DiscoveredDeviceData} data - The data to initialize the DiscoveredDevice with
   * @constructor
   */
  constructor(data) {
    super(data);
    if (data.id !== undefined) this.id = data.id;
    this.name = data.name;
    this.deviceId = data.deviceId;
    if (data.type !== undefined) this.type = data.type;
    if (data.discriminator !== undefined)
      this.discriminator = data.discriminator;
    if (data.driver !== undefined) this.driver = data.driver;
    this.deviceData = data.deviceData;
    if (data.ignore !== undefined) this.ignore = data.ignore;
    if (data.organizationId !== undefined)
      this.organizationId = data.organizationId;
    if (data.propertyId !== undefined) this.propertyId = data.propertyId;
  }
}

Object.defineProperty(DiscoveredDevice.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "discoveredDevice.json",
    title: "Discovered Device",
    description:
      "A device that has been discovered by Kohost, but not yet added to the Kohost system.",
    type: "object",
    required: ["name", "deviceId", "deviceData"],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      name: { type: "string" },
      deviceId: { type: "string" },
      type: {
        type: "string",
        enum: ["discoveredDevice"],
        default: "discoveredDevice",
      },
      discriminator: { $ref: "definitions.json#/definitions/type" },
      driver: { type: "string" },
      deviceData: { type: "object" },
      ignore: { type: "boolean" },
      organizationId: {
        type: ["string", "null"],
        description: "Reference (id) to the organization that owns this device",
      },
      propertyId: {
        type: ["string", "null"],
        description:
          "Reference (id) to the property that this device belongs to",
      },
    },
  },
});

Object.defineProperty(DiscoveredDevice.prototype, "validator", {
  get: function () {
    return validate;
  },
});
