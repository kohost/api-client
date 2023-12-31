// Create the Lock Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type LockSchema } from "../schemas/lock.json";
import Entity from "./Entity";

registerSchema(schema);

class Lock extends Entity {
  constructor(lock: LockSchema) {
    super(lock);
  }
}

Lock.validator = compileSchema(schema);
Lock.schema = schema;
Lock.validProperties = Object.keys(schema.properties);
Lock.actionProperties = ["state"];

export default Lock;
