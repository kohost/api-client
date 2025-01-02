// Create the Log Model
const schemas = require("../utils/schema");
const schema = require("../schemas/log.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Log extends Entity {
  /**
   * @typedef {import("../schemas/LogSchema").Log} LogType
   * Create a Product instance.
   * @constructor
   * @param {Log} log - The log object of type Log.
   */
  constructor(log) {
    super(log);
  }
}

Object.defineProperty(Log.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Log.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Log, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Log;
