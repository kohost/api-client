import Ajv from "ajv";
import addFormats from "ajv-formats";
import defininitions from "../schemas/definitions.json";

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

export function add(schema) {
  ajv.addSchema(schema);
}

export function compile(schema) {
  return ajv.compile(schema);
}
