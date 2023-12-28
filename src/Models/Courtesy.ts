// create the Courtesy Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/courtesy.json";
import Entity from "./Entity";
import { CourtesySchema } from "../types/CourtesySchema";

add(schema);
const validator = compile(schema);

class Courtesy extends Entity {
  constructor(courtesy: CourtesySchema) {
    super(courtesy);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  static get actionProperties() {
    return ["state"];
  }
}

export default Courtesy;
