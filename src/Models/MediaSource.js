// create the Media Source Model
const schemas = require("../utils/schema");
const schema = require("../schemas/mediaSource.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class MediaSource extends Entity {
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
  value: Object.keys(schema.properties),
});

module.exports = MediaSource;
