// create the Application model
const schemas = require("../utils/schema");
const schema = require("../schemas/application.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);
class Application extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Application.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Application.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Application, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Application;
