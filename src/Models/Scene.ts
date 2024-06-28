import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { sceneSchema } from "./../schemas/scene";
import { Entity } from "./Entity";

registerSchema(sceneSchema);
const validator = createValidator(sceneSchema);

export type SceneSchema = FromSchema<
  typeof sceneSchema,
  { references: [typeof definitionsSchema] }
>;

export class Scene extends Entity<SceneSchema> {
  static schema = sceneSchema;
  validator = validator;

  constructor(data: SceneSchema) {
    super(data);
  }
}
