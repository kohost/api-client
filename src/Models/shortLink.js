// Create the Lock Model
const schemas = require("../utils/schema");
const schema = require("../schemas/shortLink.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class ShortLink extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(ShortLink.prototype, "schema", {
  value: schema,
});

Object.defineProperty(ShortLink.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(ShortLink, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = ShortLink;
