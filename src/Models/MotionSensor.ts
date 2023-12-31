// create the Motion Sensor Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type MotionSensorSchema } from "../schemas/motionSensor.json";
import Entity from "./Entity";

registerSchema(schema);

interface MotionSensor extends MotionSensorSchema {}

class MotionSensor extends Entity {
  constructor(motionSensor: MotionSensorSchema) {
    super(motionSensor);
  }
}

MotionSensor.validator = compileSchema(schema);
MotionSensor.schema = schema;
MotionSensor.validProperties = Object.keys(schema.properties);

export default MotionSensor;
