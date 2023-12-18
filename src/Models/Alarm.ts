// create the Alarm Model
import schemas from "../utils/schema";
import schema from "../schemas/alarm.json";
import Entity from "./Entity";

schemas.add(schema);
const validator = schemas.compile(schema);

type AlarmSchema = import("../types/AlarmSchema").AlarmSchema;

class Alarm extends Entity {
  constructor(alarm: AlarmSchema) {
    super(alarm);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(schema.properties);
}

export default Alarm;
