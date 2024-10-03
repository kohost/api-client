// create the Media Source Model
import schema, { properties } from "../schemas/mediaSource.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class MediaSource extends Entity {
  /**
   * @typedef {import("../schemas/MediaSourceSchema").MediaSource} MediaSourceType
   * Create a MediaSource instance.
   * @constructor
   * @param {MediaSourceType} mediaSource - The mediaSource object of type MediaSource.
   */
  constructor(mediaSource) {
    super(mediaSource);
  }
}

Object.defineProperty(MediaSource.prototype, "schema", {
  value: schema,
});

Object.defineProperty(MediaSource.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(MediaSource, "validProperties", {
  value: Object.keys(properties),
});
