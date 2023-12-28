// create the Credential Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/credential.json";
import Entity from "./Entity";
import { CredentialSchema } from "../types/CredentialSchema";

add(schema);
const validator = compile(schema);

class Credential extends Entity {
  constructor(credential: CredentialSchema) {
    super(credential);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Credential;
