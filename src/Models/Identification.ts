import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/identification.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type IdentificationType =
  import("../types/IdentificationSchema").Identification;

class Identification extends Entity {
  constructor(identification: IdentificationType) {
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
