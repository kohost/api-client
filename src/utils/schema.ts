import Ajv, { AnySchema } from "ajv";

import addFormats from "ajv-formats";
import { definitions } from "../schemas/definitions.json";

const validation = new Ajv({
  allErrors: true,
  useDefaults: true,
  strict: false,
  allowMatchingProperties: true,
  allowUnionTypes: true,
  strictRequired: false,
});

addFormats(validation);

registerSchema(definitions);

export function registerSchema(schema: AnySchema) {
  validation.addSchema(schema);
}

export function compileSchema(schema: AnySchema) {
  return validation.compile(schema);
}

export default {
  add: registerSchema,
  compile: compileSchema,
};
