// create the Courtesy Model
import schema, { properties } from "../schemas/courtesy.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Courtesy extends Entity {
  /**
   * @typedef {import("../schemas/CourtesySchema").Courtesy} CourtesyType
   * Create a Courtesy instance.
   * @constructor
   * @param {CourtesyType} courtesy - The courtesy object of type Courtesy.
   */
  constructor(courtesy) {
    super(courtesy);
  }
}

Object.defineProperty(Courtesy.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Courtesy.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Courtesy, "validProperties", {
  value: Object.keys(properties),
});

Object.defineProperty(Courtesy, "actionProperties", {
  value: ["state"],
});
