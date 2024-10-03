import schema, { properties } from "../schemas/identification.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Identification extends Entity {
  /**
   * @typedef {import("../schemas/IdentificationSchema").Identification} IdentificationType
   * Create a Identification instance.
   * @constructor
   * @param {IdentificationType} identification - The identification object of type Identification.
   */
  constructor(identification) {
    super(identification);
  }

  get isExpired() {
    return new Date(this.expires) < new Date();
  }
}

Object.defineProperty(Identification.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Identification.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Identification, "validProperties", {
  value: Object.keys(properties),
});
