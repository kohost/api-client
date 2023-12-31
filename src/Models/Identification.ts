import { registerSchema, compileSchema } from "../utils/schema";
import {
  schema,
  type IdentificationSchema,
} from "../schemas/identification.json";
import Entity from "./Entity";

registerSchema(schema);
const validator = compileSchema(schema);

interface Identification extends IdentificationSchema {}

class Identification extends Entity {
  constructor(identification: IdentificationSchema) {
    super(identification);
  }

  get isExpired(): boolean {
    if (!this.expires) return false;
    if (this.expires instanceof Date) return this.expires < new Date();
    if (typeof this.expires === "string")
      return new Date(this.expires) < new Date();
    return false;
  }
}

Identification.schema = schema;
Identification.validator = validator;
Identification.validProperties = Object.keys(schema.properties);

export default Identification;
