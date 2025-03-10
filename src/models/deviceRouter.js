/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateDeviceRouter as validate } from "../validate";

/**
 * @typedef {Object} DeviceRouterData A device router contains instructions on where to route devices based on their organization and driver.
 * @property {string} [id] - Identifier of the object.
 * @property {"deviceRouter"} [type] - Default: "deviceRouter"
 * @property {string} driver
 * @property {string} organizationId - Reference (id) to the organization that owns this router
 * @property {object} [devices]
 */

/**
 * A device router contains instructions on where to route devices based on their organization and driver.
 * @class DeviceRouter
 * @extends {Entity}
 */
export class DeviceRouter extends Entity {
  /**
   * @constructor
   * @param {DeviceRouterData} data - The data to initialize the DeviceRouter with
   */
  constructor(data) {
    super(data);
    if (data.id !== undefined) this.id = data.id;
    if (data.type !== undefined) this.type = data.type;
    this.driver = data.driver;
    this.organizationId = data.organizationId;
    if (data.devices !== undefined) this.devices = data.devices;
  }
}

Object.defineProperty(DeviceRouter.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "deviceRouter.json",
    title: "Device Router",
    description:
      "A device router contains instructions on where to route devices based on their organization and driver.",
    type: "object",
    required: ["driver", "organizationId"],
    additionalProperties: false,
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { type: "string", default: "deviceRouter", enum: ["deviceRouter"] },
      driver: { type: "string" },
      organizationId: {
        type: ["string", "null"],
        description: "Reference (id) to the organization that owns this router",
      },
      devices: { type: "object", additionalProperties: true },
    },
  },
});

Object.defineProperty(DeviceRouter.prototype, "validator", {
  get: function () {
    return validate;
  },
});
