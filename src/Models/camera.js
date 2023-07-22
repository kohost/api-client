// create the Alarm Model
const schemas = require("../utils/schema");
const schema = require("../schemas/camera.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Camera extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Camera.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Camera.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Camera, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Camera;
