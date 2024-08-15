import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { cameraSchema } from "./../schemas/camera";
import { Entity } from "./Entity";

registerSchema(cameraSchema);
const validator = createValidator(cameraSchema);

export type CameraSchema = FromSchema<
  typeof cameraSchema,
  { references: [typeof definitionsSchema] }
>;

export class Camera extends Entity<CameraSchema> {
  static schema = cameraSchema;
  validator = validator;
}
