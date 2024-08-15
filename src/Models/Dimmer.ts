import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { dimmerSchema } from "./../schemas/dimmer";
import { Entity } from "./Entity";

registerSchema(dimmerSchema);
const validator = createValidator(dimmerSchema);

export type DimmerSchema = FromSchema<
  typeof dimmerSchema,
  { references: [typeof definitionsSchema] }
>;

export class Dimmer extends Entity<DimmerSchema> {
  static schema = dimmerSchema;
  static actionProperties = ["level"];
  validator = validator;
}
