// create the Switch model
import schema, { properties } from "../schemas/switch.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Switch extends Entity {
  /**
   * @typedef {import("../schemas/SwitchSchema").Switch} SwitchType
   * Create a Switch instance.
   * @constructor
   * @param {SwitchType} _switch - The _switch object of type Switch.
   */
  constructor(_switch) {
    super(_switch);
  }
}

Object.defineProperty(Switch.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Switch.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Switch, "validProperties", {
  value: Object.keys(properties),
});

Object.defineProperty(Switch, "actionProperties", {
  value: ["state"],
});
