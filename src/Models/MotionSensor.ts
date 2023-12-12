// create the Motion Sensor Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/motionSensor.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type MotionSensorType = import("../types/MotionSensorSchema").MotionSensor;

class MotionSensor extends Entity {
  constructor(motionSensor: MotionSensorType) {
    super(motionSensor);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default MotionSensor;
