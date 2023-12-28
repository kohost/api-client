// create the Alarm Model
import schemas from "../utils/schema";
import schema from "../schemas/alarm.json";
import Entity from "./Entity";
import { AlarmSchema } from "../types/AlarmSchema";

schemas.add(schema);
const validator = schemas.compile(schema);

class Alarm extends Entity {
  constructor(alarm: AlarmSchema) {
    super(alarm);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(schema.properties);
}

export default Alarm;
