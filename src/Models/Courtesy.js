// create the Courtesy Model
const schemas = require("../utils/schema");
const schema = require("../schemas/courtesy.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Courtesy extends Kohost {
  /**
   * @typedef {import("../schemas/CourtesySchema").Courtesy} CourtesyType
   * Create a Courtesy instance.
   * @constructor
   * @param {CourtesyType} courtesy - The courtesy object of type Courtesy.
   */
  constructor(courtesy) {
    super(courtesy);
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

Object.defineProperty(Courtesy, "actionProperties", {
  value: ["state"],
});

module.exports = Courtesy;
