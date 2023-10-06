// Create the Dimmer Model
const schemas = require("../utils/schema");
const schema = require("../schemas/dimmer.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

/**
 * Represents a Dimmer device.
 * @class
 * @extends Entity
 */

class Dimmer extends Entity {
  /**
   * @typedef {import("../schemas/DimmerSchema").Dimmer} DimmerType
   * Create a Dimmer instance.
   * @constructor
   * @param {DimmerType} dimmer - The dimmer object of type Dimmer.
   */
  constructor(dimmer) {
    super(dimmer);
  }

  static getActionDelta(old, _new) {
    const delta = {};
    for (const action in _new) {
      if (this.actionProperties?.includes(action)) {
        if (action === "level") {
          const oldLevel = old[action];
          const newLevel = _new[action];
          delta[action] = newLevel - oldLevel / 100;
        } else {
          delta[action] = 1;
        }
      }
    }
    return delta;
  }
}

Object.defineProperty(Dimmer.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Dimmer.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Dimmer, "validProperties", {
  value: Object.keys(schema.properties),
});

Object.defineProperty(Dimmer, "actionProperties", {
  value: ["level"],
});

module.exports = Dimmer;
