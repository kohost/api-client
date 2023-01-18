// create the Media Source Model
const schemas = require("../utils/schema");
const schema = require("../schemas/mediaSource.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class MediaSource extends Kohost {
  constructor(data) {
    super(data);
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
