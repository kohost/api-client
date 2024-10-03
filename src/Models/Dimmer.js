// Create the Dimmer Model
import schema, { properties } from "../schemas/dimmer.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

/**
 * Represents a Dimmer device.
 * @class
 * @extends Entity
 */

export class Dimmer extends Entity {
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
  value: Object.keys(properties),
});

Object.defineProperty(Dimmer, "actionProperties", {
  value: ["level"],
});
