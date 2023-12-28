import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/identification.json";
import Entity from "./Entity";
import { IdentificationSchema } from "../types/IdentificationSchema";

add(schema);
const validator = compile(schema);

class Identification extends Entity {
  constructor(identification: IdentificationSchema) {
    super(identification);
  }

  get isExpired() {
    return new Date(this.expires) < new Date();
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Identification;
