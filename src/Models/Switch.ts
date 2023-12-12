// create the Switch model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/switch.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type SwitchType = import("../types/SwitchSchema").Switch;

class Switch extends Entity {
  constructor(_switch: SwitchType) {
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
