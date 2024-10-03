// create the Alarm Model
import schema, { properties } from "../schemas/alarm.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Alarm extends Entity {
  /**
   * @typedef {import("../schemas/AlarmSchema").Alarm} AlarmType
   * Create a Alarm instance.
   * @constructor
   * @param {AlarmType} alarm - The alarm object of type Alarm.
   */
  constructor(alarm) {
    super(alarm);
  }
}

Object.defineProperty(Alarm.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Alarm.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Alarm, "validProperties", {
  value: Object.keys(properties),
});
