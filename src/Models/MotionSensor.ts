import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { motionSensorSchema } from "./../schemas/motionSensor";
import { Entity } from "./Entity";

registerSchema(motionSensorSchema);
const validator = createValidator(motionSensorSchema);

export type MotionSensorSchema = FromSchema<
  typeof motionSensorSchema,
  { references: [typeof definitionsSchema] }
>;

export class MotionSensor extends Entity<MotionSensorSchema> {
  static schema = motionSensorSchema;
  validator = validator;
}

export default MotionSensor;
