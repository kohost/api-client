// create the Alarm Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type AlarmSchema } from "../schemas/alarm.json";
import Entity from "./Entity";

registerSchema(schema);

interface Alarm extends AlarmSchema {}

class Alarm extends Entity {
  constructor(alarm: AlarmSchema) {
    super(alarm);
  }
}

Alarm.validator = compileSchema(schema);
Alarm.schema = schema;
Alarm.validProperties = Object.keys(schema.properties);

export default Alarm;
