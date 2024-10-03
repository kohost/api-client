// Create the Gateway Model
import schema, { properties } from "../schemas/gateway.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Gateway extends Entity {
  /**
   * @typedef {import("../schemas/GatewaySchema").Gateway} GatewayType
   * Create a Gateway instance.
   * @constructor
   * @param {GatewayType} gateway - The gateway object of type Gateway.
   */
  constructor(gateway) {
    super(gateway);
  }
}

Object.defineProperty(Gateway.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Gateway.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Gateway, "validProperties", {
  value: Object.keys(properties),
});
