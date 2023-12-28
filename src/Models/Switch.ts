// create the Switch model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/switch.json";
import Entity from "./Entity";
import { SwitchSchema } from "../types/SwitchSchema";

add(schema);
const validator = compile(schema);

class Switch extends Entity {
  constructor(_switch: SwitchSchema) {
    super(_switch);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  get actionProperties() {
    return ["state"];
  }
}

export default Switch;
