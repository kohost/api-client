// Create the Lock Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/shortLink.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type ShortLinkType = import("../types/ShortLinkSchema").ShortLink;

class ShortLink extends Entity {
  constructor(shortlink: ShortLinkType) {
    super(shortlink);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default ShortLink;
