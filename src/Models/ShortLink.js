// Create the Lock Model
const schemas = require("../utils/schema");
const schema = require("../schemas/shortLink.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class ShortLink extends Entity {
  /**
   * @typedef {import("../schemas/ShortLinkSchema").ShortLink} ShortLinkType
   * Create a ShortLink instance.
   * @constructor
   * @param {ShortLinkType} shortlink - The shortlink object of type ShortLink.
   */
  constructor(shortlink) {
    super(shortlink);
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
