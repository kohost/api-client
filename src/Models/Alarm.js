// create the Alarm Model
const schemas = require("../utils/schema");
const schema = require("../schemas/alarm.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Alarm extends Kohost {
  /**
   * @typedef {import("../schemas/AlarmSchema").Alarm} AlarmType
   * Create a Alarm instance.
   * @constructor
   * @param {AlarmType} alarm - The alarm object of type Alarm.
   */
  constructor(alarm) {
    super(alarm);
  }
}

Object.defineProperty(Alarm.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Alarm.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Alarm, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Alarm;
