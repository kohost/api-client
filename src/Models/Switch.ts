// create the Switch model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type SwitchSchema } from "../schemas/switch.json";
import Entity from "./Entity";

registerSchema(schema);

interface Switch extends SwitchSchema {}

class Switch extends Entity {
  constructor(_switch: SwitchSchema) {
    super(_switch);
  }
}

Switch.validator = compileSchema(schema);
Switch.schema = schema;
Switch.validProperties = Object.keys(schema.properties);
Switch.actionProperties = ["state"];

export default Switch;
