/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateCategory as validate } from "../validate";

/**
 * @typedef {Object} CategoryData
 * @property {string} id - Identifier of the object.
 * @property {"category"} type - Default: "category"
 * @property {string} [name]
 * @property {("adlink"|"aws-kinesis"|"bacnet"|"benq"|"butler"|"comelit"|"crestron"|"dell"|"digital-watchdog"|"distech"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"newline"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"smartboard"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vivotek"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} [driver] - Driver used to communicate with the object.
 * @property {string} [description]
 * @property {{id?: any, type: "mediaFile", name?: string, fileHash?: string, category?: string, mimeType?: ("image/*"|"image/jpeg"|"image/png"|"image/gif"|"image/webp"|"image/avif"|"image/svg+xml"|"application/pdf"), data?: string, url?: string, width?: number, height?: number, size?: number, uploadUrl?: string, uploadUrlExpires?: any, createdBy?: string, systemId?: any}} [image] - Any media file
 * @property {number} [rating] - Default: 9
 * @property {("space"|"product"|"mediaFile"|"property"|"user")} discriminator
 * @property {string} [systemId] - Identifier of the object, directly related to the system.
 */

/**
 *
 * @class Category
 * @extends {Entity}
 */
export class Category extends Entity {
  /**
   * @constructor
   * @param {CategoryData} data - The data to initialize the Category with
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    this.type = data.type;
    if (data.name !== undefined) this.name = data.name;
    if (data.driver !== undefined) this.driver = data.driver;
    if (data.description !== undefined) this.description = data.description;
    if (data.image !== undefined) this.image = data.image;
    if (data.rating !== undefined) this.rating = data.rating;
    this.discriminator = data.discriminator;
    if (data.systemId !== undefined) this.systemId = data.systemId;
  }
}

Object.defineProperty(Category.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "category.json",
    title: "Category",
    type: "object",
    required: ["id", "type", "discriminator"],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { type: "string", enum: ["category"], default: "category" },
      name: { type: "string", minLength: 1 },
      driver: { $ref: "definitions.json#/definitions/driver" },
      description: { type: "string" },
      image: { $ref: "mediaFile.json" },
      rating: { type: "number", minimum: 0, maximum: 10, default: 9 },
      discriminator: {
        type: "string",
        enum: ["space", "product", "mediaFile", "property", "user"],
      },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
    },
  },
});

Object.defineProperty(Category.prototype, "validator", {
  get: function () {
    return validate;
  },
});
