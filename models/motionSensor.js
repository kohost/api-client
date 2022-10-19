// create the Motion Sensor Model
const schemas = require("../utils/schema");
const schema = require("../schemas/motionSensor.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class MotionSensor extends Kohost {
  constructor(data) {
    super(data);
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
