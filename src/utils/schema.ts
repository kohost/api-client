import Ajv from "ajv";

import addFormats from "ajv-formats";
import defininitions from "../schemas/definitions.json";

type AnySchema = import("ajv").AnySchema;

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  strict: false,
  allowMatchingProperties: true,
  allowUnionTypes: true,
  strictRequired: false,
});
addFormats(ajv);
ajv.addSchema(defininitions);

export function add(schema: AnySchema) {
  ajv.addSchema(schema);
}

export function compile(schema: AnySchema) {
  return ajv.compile(schema);
}

export default {
  add,
  compile,
};
