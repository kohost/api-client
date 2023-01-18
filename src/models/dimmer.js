// Create the Dimmer Model
const schemas = require("../utils/schema");
const schema = require("../schemas/dimmer.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Dimmer extends Kohost {
  constructor(data) {
    super(data);
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
