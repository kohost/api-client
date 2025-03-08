/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateSpace as validate } from "../validators";

/**
 * @typedef {Object} SpaceData
 * @property {string} id - Identifier of the object.
 * @property {string} name
 * @property {"space"} type - Default: "space"
 * @property {("classRoom"|"hotelRoom"|"office"|"building"|"commonArea"|"conferenceRoom"|"lobby"|"gym"|"pool"|"restaurant"|"unit")} discriminator
 * @property {("adlink"|"aws-kinesis"|"bacnet"|"butler"|"comelit"|"crestron"|"dell"|"distech"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vivotek"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} [driver] - Driver used to communicate with the object.
 * @property {string} [category] - This is the category id
 * @property {string[]} [rooms]
 * @property {string[]} [subGroups]
 * @property {boolean} [occupied]
 * @property {boolean} [inUse]
 * @property {{active?: boolean, activatedAt?: (string|object), allowed?: boolean, previousState?: object}} [eco] - Default: {"active":false,"allowed":false,"previousState":null}
 * @property {boolean} [eco.active] - Default: false
 * @property {(string|object)} [eco.activatedAt]
 * @property {boolean} [eco.allowed] - Default: false
 * @property {object} [eco.previousState]
 * @property {"pet"[]} [features]
 * @property {number} [maximumOccupancy]
 * @property {("clean"|"dirty"|"inspected"|"pickup")} [housekeepingStatus]
 * @property {("inService"|"outOfOrder"|"outOfService")} [serviceStatus]
 * @property {string} [systemId] - Identifier of the object, directly related to the system.
 */

/**
 *
 * @class Space
 * @extends {Entity}
 */
export class Space extends Entity {
  /**
   * @constructor
   * @param {SpaceData} data - The data to initialize the Space with
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.discriminator = data.discriminator;
    if (data.driver !== undefined) this.driver = data.driver;
    if (data.category !== undefined) this.category = data.category;
    if (data.rooms !== undefined) this.rooms = data.rooms;
    if (data.subGroups !== undefined) this.subGroups = data.subGroups;
    if (data.occupied !== undefined) this.occupied = data.occupied;
    if (data.inUse !== undefined) this.inUse = data.inUse;
    if (data.eco !== undefined) this.eco = data.eco;
    if (data.features !== undefined) this.features = data.features;
    if (data.maximumOccupancy !== undefined)
      this.maximumOccupancy = data.maximumOccupancy;
    if (data.housekeepingStatus !== undefined)
      this.housekeepingStatus = data.housekeepingStatus;
    if (data.serviceStatus !== undefined)
      this.serviceStatus = data.serviceStatus;
    if (data.systemId !== undefined) this.systemId = data.systemId;
  }

  get floor() {
    const floors = new Set();

    this.rooms.forEach((room) => {
      if (room.floor) floors.add(room.floor);
    });

    return floors.size == 1 ? [...floors][0] : undefined;
  }
  get hasDimmer() {
    return this.rooms.some((room) => room.hasDimmer);
  }
  get hasSwitch() {
    return this.rooms.some((room) => room.hasSwitch);
  }
  get hasWindowCovering() {
    return this.rooms.some((room) => room.hasWindowCovering);
  }
  get hasThermostat() {
    return this.rooms.some((room) => room.hasThermostat);
  }
  get hasLock() {
    return this.rooms.some((room) => room.hasLock);
  }
  get hasCourtesy() {
    return this.rooms.some((room) => room.hasCourtesy);
  }
  get hasCamera() {
    return this.rooms.some((room) => room.hasCamera);
  }
  get hasAlarm() {
    return this.rooms.some((room) => room.hasAlarm);
  }
  get hasMedia() {
    return this.rooms.some((room) => room.hasMedia);
  }
}

Object.defineProperty(Space.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "space.json",
    title: "Space",
    type: "object",
    required: ["id", "name", "type", "discriminator"],
    additionalProperties: false,
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      name: { type: "string", minLength: 1 },
      type: { type: "string", default: "space", enum: ["space"] },
      discriminator: {
        type: "string",
        enum: [
          "classRoom",
          "hotelRoom",
          "office",
          "building",
          "commonArea",
          "conferenceRoom",
          "lobby",
          "gym",
          "pool",
          "restaurant",
          "unit",
        ],
      },
      driver: { $ref: "definitions.json#/definitions/driver" },
      category: { type: "string", description: "This is the category id" },
      rooms: { type: "array", items: { type: "string" } },
      subGroups: { type: "array", items: { type: "string" } },
      occupied: { type: "boolean" },
      inUse: { type: "boolean" },
      eco: {
        type: "object",
        additionalProperties: false,
        default: { active: false, allowed: false, previousState: null },
        properties: {
          active: { type: "boolean", default: false },
          activatedAt: { type: ["string", "object"], format: "date-time" },
          allowed: { type: "boolean", default: false },
          previousState: {
            type: ["object", "null"],
            properties: {
              thermostats: {
                type: "object",
                patternProperties: {
                  ".*": {
                    type: "object",
                    properties: {
                      setpoints: {
                        $ref: "thermostat.json#/properties/setpoints",
                      },
                    },
                  },
                },
              },
            },
            additionalProperties: false,
          },
        },
      },
      features: { type: "array", items: { type: "string", enum: ["pet"] } },
      maximumOccupancy: { type: "number", minimum: 1 },
      housekeepingStatus: {
        type: "string",
        enum: ["clean", "dirty", "inspected", "pickup"],
      },
      serviceStatus: {
        type: "string",
        enum: ["inService", "outOfOrder", "outOfService"],
      },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
    },
  },
});

Object.defineProperty(Space.prototype, "validator", {
  get: function () {
    return validate;
  },
});
