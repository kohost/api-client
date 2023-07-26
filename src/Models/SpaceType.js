// Create the Space Type Model
// Originally used for hotel room type e.g. Double Queen
const schemas = require("../utils/schema");
const schema = require("../schemas/spaceType.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class SpaceType extends Kohost {
  /**
   * @typedef {import("../schemas/SpaceTypeSchema").SpaceType} SpaceTypeType
   * Create a SpaceType instance.
   * @constructor
   * @param {SpaceTypeType} spaceType - The spaceType object of type SpaceType.
   */
  constructor(spaceType) {
    super(spaceType);
  }
}

Object.defineProperty(SpaceType.prototype, "schema", {
  value: schema,
});

Object.defineProperty(SpaceType.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(SpaceType, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = SpaceType;
