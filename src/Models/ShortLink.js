// Create the Lock Model
import schema, { properties } from "../schemas/shortLink.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class ShortLink extends Entity {
  /**
   * @typedef {import("../schemas/ShortLinkSchema").ShortLink} ShortLinkType
   * Create a ShortLink instance.
   * @constructor
   * @param {ShortLinkType} shortlink - The shortlink object of type ShortLink.
   */
  constructor(shortlink) {
    super(shortlink);
  }
}

Object.defineProperty(ShortLink.prototype, "schema", {
  value: schema,
});

Object.defineProperty(ShortLink.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(ShortLink, "validProperties", {
  value: Object.keys(properties),
});
