import schema, { properties } from "../schemas/property.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Property extends Entity {
  /**
   * @typedef {import("../schemas/PropertySchema").Property} PropertyType
   * Create a Property instance.
   * @constructor
   * @param {PropertyType} property - The property object of type Property.
   */
  constructor(property) {
    super(property);
  }
}

Object.defineProperty(Property.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Property.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Property, "validProperties", {
  value: Object.keys(properties),
});
