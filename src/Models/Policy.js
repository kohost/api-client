import schema, { properties } from "../schemas/policy.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Policy extends Entity {
  /**
   * @typedef {import("../schemas/PolicySchema").Policy} PolicyType
   * Create a Permission Policy instance.
   * @constructor
   * @param {PolicyType} policy - The policy object of type PolicyType.
   */
  constructor(policy) {
    super(policy);
  }
}

Object.defineProperty(Policy.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Policy.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Policy, "validProperties", {
  value: Object.keys(properties),
});
