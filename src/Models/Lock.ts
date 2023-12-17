// Create the Lock Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/lock.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type LockSchema = import("../types/LockSchema").LockSchema;

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
