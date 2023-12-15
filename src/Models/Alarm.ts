// create the Alarm Model
import schemas from "../utils/schema";
import alarmSchemaDef, { AlarmEntity } from "../schemas/alarmSchema";
import Entity from "./Entity";

schemas.add(alarmSchemaDef);
const validator = schemas.compile(alarmSchemaDef);

class Alarm extends Entity {
  constructor(alarm: AlarmEntity) {
    super(alarm);
  }

  schema = alarmSchemaDef;
  validator = validator;
  validProperties = Object.keys(alarmSchemaDef.properties);
}

export default Alarm;
