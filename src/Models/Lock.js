// Create the Lock Model
import schema, { properties } from "../schemas/lock.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Lock extends Entity {
  constructor(lock) {
    super(lock);
  }
}

Object.defineProperty(Lock.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Lock.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Lock, "validProperties", {
  value: Object.keys(properties),
});

Object.defineProperty(Lock, "actionProperties", {
  value: ["state"],
});
