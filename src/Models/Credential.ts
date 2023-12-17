// create the Credential Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/credential.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type CredentialSchema = import("../types/CredentialSchema").CredentialSchema;

class Credential extends Entity {
  constructor(credential: CredentialSchema) {
    super(credential);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Credential;
