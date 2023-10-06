// create the Camera Model
const schemas = require("../utils/schema");
const schema = require("../schemas/camera.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Camera extends Entity {
  /**
   * @typedef {import("../schemas/CameraSchema").Camera} CameraType
   * Create a Camera instance.
   * @constructor
   * @param {CameraType} camera - The camera object of type Camera.
   */
  constructor(camera) {
    super(camera);
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
