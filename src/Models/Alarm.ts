// create the Alarm Model
import schemas from "../utils/schema";
import alarmSchemaDef from "../schemas/alarm.json";
import Entity from "./Entity";

schemas.add(alarmSchemaDef);
const validator = schemas.compile(alarmSchemaDef);

type AlarmType = import("../types/AlarmSchema").Alarm;

class Alarm extends Entity {
  constructor(alarm: AlarmType) {
    super(alarm);
  }

  schema = alarmSchemaDef;
  validator = validator;
  validProperties = Object.keys(alarmSchemaDef.properties);
}

export default Alarm;
