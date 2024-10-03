// Create the WindowCovering Model
import schema, { properties } from "../schemas/windowCovering.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class WindowCovering extends Entity {
  /**
   * @typedef {import("../schemas/WindowCoveringSchema").WindowCovering} WindowCoveringType
   * Create a WindowCovering instance.
   * @constructor
   * @param {WindowCoveringType} windowCovering - The windowCovering object of type WindowCovering.
   */
  constructor(windowCovering) {
    super(windowCovering);
  }

  static getActionDelta(old, _new) {
    const delta = {};
    for (const action in _new) {
      if (this.actionProperties?.includes(action)) {
        if (action === "position") {
          const oldPos = old[action];
          const newPos = _new[action];
          delta[action] = newPos - oldPos / 100;
        } else if (old[action] !== _new[action]) {
          delta[action] = 1;
        }
      }
    }
    return delta;
  }
}

Object.defineProperty(WindowCovering.prototype, "schema", {
  value: schema,
});

Object.defineProperty(WindowCovering.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(WindowCovering, "validProperties", {
  value: Object.keys(properties),
});

Object.defineProperty(WindowCovering, "actionProperties", {
  value: ["position"],
});
