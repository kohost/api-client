/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateShortLink as validate } from "../validators";

export class ShortLink extends Entity {
  /**
   * @typedef {Object} ShortLinkData
   * @property {string} [id] - Identifier of the object.
   * @property {"shortLink"} [type] - Default: "shortLink"
   * @property {string} [title]
   * @property {any} destination
   * @property {any} url
   * @property {string} [systemId] - Identifier of the object, directly related to the system.
   */

  /**
   * @param {ShortLinkData} data - The data to initialize the ShortLink with
   * @constructor
   */
  constructor(data) {
    super(data);
    if (data.id !== undefined) this.id = data.id;
    if (data.type !== undefined) this.type = data.type;
    if (data.title !== undefined) this.title = data.title;
    if (data.destination !== undefined) this.destination = data.destination;
    if (data.url !== undefined) this.url = data.url;
    if (data.systemId !== undefined) this.systemId = data.systemId;
  }
}

Object.defineProperty(ShortLink.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "shortLink.json",
    title: "Short Link",
    type: "object",
    required: ["destination", "url"],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { type: "string", default: "shortLink", enum: ["shortLink"] },
      title: { type: "string" },
      destination: { string: "string", format: "uri" },
      url: { string: "string", format: "uri" },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
    },
  },
});

Object.defineProperty(ShortLink.prototype, "validator", {
  get: function () {
    return validate;
  },
});
