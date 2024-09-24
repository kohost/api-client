import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { dimmerSchema } from "../schemas/dimmer";
import { switchSchema } from "../schemas/switch";
import { thermostatSchema } from "../schemas/thermostat";
import { windowCoveringSchema } from "../schemas/windowCovering";
import { createValidator, registerSchema } from "../utils/validation";
import { sceneSchema } from "./../schemas/scene";
import { Entity } from "./Entity";

registerSchema(definitionsSchema);
registerSchema(switchSchema);
registerSchema(thermostatSchema)
registerSchema(dimmerSchema);
registerSchema(windowCoveringSchema)
registerSchema(sceneSchema);
const validator = createValidator(sceneSchema);

export type SceneSchema = FromSchema<
  typeof sceneSchema,
  { references: [typeof definitionsSchema, typeof switchSchema, typeof thermostatSchema, typeof windowCoveringSchema, typeof dimmerSchema] }
>;

export class Scene extends Entity<SceneSchema> {
  static schema = sceneSchema;
  validator = validator;
}

export default Scene;
