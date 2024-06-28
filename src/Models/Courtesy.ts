import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { courtesySchema } from "./../schemas/courtesy";
import { Entity } from "./Entity";

registerSchema(courtesySchema);
const validator = createValidator(courtesySchema);

export type CourtesySchema = FromSchema<
  typeof courtesySchema,
  { references: [typeof definitionsSchema] }
>;

export class Courtesy extends Entity<CourtesySchema> {
  static schema = courtesySchema;
  validator = validator;

  constructor(data: CourtesySchema) {
    super(data);
  }
}
