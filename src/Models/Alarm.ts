// create the Alarm Model
import schemas from "../utils/schema";
import alarmSchemaDef from "../schemas/alarmSchema";
import Entity from "./Entity";

schemas.add(alarmSchemaDef);
const validator = schemas.compile(alarmSchemaDef);

type AlarmSchema = import("../types/AlarmSchema").AlarmSchema;

class Alarm extends Entity {
  constructor(alarm: AlarmSchema) {
    super(alarm);
  }

  schema = alarmSchemaDef;
  validator = validator;
  validProperties = Object.keys(alarmSchemaDef.properties);
}

export default Alarm;
