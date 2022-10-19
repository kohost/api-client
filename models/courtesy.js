// create the Courtesy Model
const schemas = require("../utils/schema");
const schema = require("../schemas/courtesy.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Courtesy extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Courtesy.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Courtesy.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Courtesy, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Courtesy;
