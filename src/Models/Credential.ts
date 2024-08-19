import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { credentialSchema } from "./../schemas/credential";
import { Entity } from "./Entity";

registerSchema(credentialSchema);
const validator = createValidator(credentialSchema);

export type CredentialSchema = FromSchema<
  typeof credentialSchema,
  { references: [typeof definitionsSchema] }
>;

export class Credential extends Entity<CredentialSchema> {
  static schema = credentialSchema;
  validator = validator;
}

export default Credential;
