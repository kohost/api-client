// create the Courtesy Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type CourtesySchema } from "../schemas/courtesy.json";
import Entity from "./Entity";

registerSchema(schema);

interface Courtesy extends CourtesySchema {}

class Courtesy extends Entity {
  constructor(courtesy: CourtesySchema) {
    super(courtesy);
  }
}

Courtesy.validator = compileSchema(schema);
Courtesy.schema = schema;
Courtesy.validProperties = Object.keys(schema.properties);
Courtesy.actionProperties = ["state"];

export default Courtesy;
