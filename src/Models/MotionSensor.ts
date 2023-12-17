// create the Motion Sensor Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/motionSensor.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type MotionSensorSchema =
  import("../types/MotionSensorSchema").MotionSensorSchema;

class MotionSensor extends Entity {
  constructor(motionSensor: MotionSensorSchema) {
    super(motionSensor);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default MotionSensor;
