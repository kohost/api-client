// Create the Lock Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/lock.json";
import Entity from "./Entity";
import { LockSchema } from "../types/LockSchema";

add(schema);
const validator = compile(schema);

class Lock extends Entity {
  constructor(lock: LockSchema) {
    super(lock);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  // Lock specific actions
  static get actionProperties() {
    return ["state"];
  }
}

export default Lock;
