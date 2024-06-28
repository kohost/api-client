import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { identificationSchema } from "./../schemas/identification";
import { Entity } from "./Entity";

registerSchema(identificationSchema);
const validator = createValidator(identificationSchema);

export type IdentificationSchema = FromSchema<
  typeof identificationSchema,
  { references: [typeof definitionsSchema] }
>;

export class Identification extends Entity<IdentificationSchema> {
  static schema = identificationSchema;
  validator = validator;

  constructor(data: IdentificationSchema) {
    super(data);
  }
}
