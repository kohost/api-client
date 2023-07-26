// Create the WindowCovering Model
const schemas = require("../utils/schema");
const schema = require("../schemas/windowCovering.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class WindowCovering extends Kohost {
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
  value: Object.keys(schema.properties),
});

Object.defineProperty(WindowCovering, "actionProperties", {
  value: ["position"],
});

module.exports = WindowCovering;
