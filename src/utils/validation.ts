import Ajv, { type AnySchema, type Options, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";


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

export function registerSchema(schema: any): void {
  
    if(!schema.$id) throw new Error("Schema must have an $id");
    if(!ajv.getSchema(schema.$id)) {
      ajv.addSchema(schema);
    }
 
}
export function createValidator(schema: AnySchema): ValidateFunction {
  return ajv.compile(schema);
}
