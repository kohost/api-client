// Create the Lock Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type ShortLinkSchema } from "../schemas/shortLink.json";
import Entity from "./Entity";

registerSchema(schema);

interface ShortLink extends ShortLinkSchema {}

class ShortLink extends Entity {
  constructor(shortlink: ShortLinkSchema) {
    super(shortlink);
  }
}

ShortLink.validator = compileSchema(schema);
ShortLink.schema = schema;
ShortLink.validProperties = Object.keys(schema.properties);

export default ShortLink;
