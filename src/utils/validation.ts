import Ajv, { type AnySchema, type Options, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import { definitionsSchema } from "../schemas/definitions";

const options: Options = {
  allErrors: true,
  useDefaults: true,
  strict: true,
  allowMatchingProperties: true,
  allowUnionTypes: true,
  strictRequired: false,
};

const ajv = new Ajv(options);

addFormats(ajv);

ajv.addSchema(definitionsSchema);

export function registerSchema(schema: AnySchema): void {
  ajv.addSchema(schema);
}
export function createValidator(schema: AnySchema): ValidateFunction {
  return ajv.compile(schema);
}
