// Create the Lock Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/shortLink.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type ShortLinkSchema = import("../types/ShortLinkSchema").ShortLinkSchema;

class ShortLink extends Entity {
  constructor(shortlink: ShortLinkSchema) {
    super(shortlink);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default ShortLink;
