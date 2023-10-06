// Create the Lock Model
const schemas = require("../utils/schema");
const schema = require("../schemas/lock.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Lock extends Entity {
  /**
   * @typedef {import("../schemas/LockSchema").Lock} LockType
   * Create a Lock instance.
   * @constructor
   * @param {LockType} lock - The lock object of type Lock.
   */
  constructor(lock) {
    super(lock);
  }
}

Object.defineProperty(Lock.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Lock.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Lock, "validProperties", {
  value: Object.keys(schema.properties),
});

Object.defineProperty(Lock, "actionProperties", {
  value: ["state"],
});

module.exports = Lock;
