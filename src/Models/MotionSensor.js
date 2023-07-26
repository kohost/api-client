// create the Motion Sensor Model
const schemas = require("../utils/schema");
const schema = require("../schemas/motionSensor.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class MotionSensor extends Kohost {
  /**
   * @typedef {import("../schemas/MotionSensorSchema").MotionSensor} MotionSensorType
   * Create a MotionSensor instance.
   * @constructor
   * @param {MotionSensorType} motionSensor - The motionSensor object of type MotionSensor.
   */
  constructor(motionSensor) {
    super(motionSensor);
  }
}

Object.defineProperty(MotionSensor.prototype, "schema", {
  value: schema,
});

Object.defineProperty(MotionSensor.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(MotionSensor, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = MotionSensor;
