// Create the Lock Model
const schemas = require("../utils/schema");
const schema = require("../schemas/lock.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Lock extends Kohost {
  constructor(data) {
    super(data);
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

module.exports = Lock;
