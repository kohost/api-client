// create the Credential Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/credential.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type CredentialType = import("../types/CredentialSchema").Credential;

class Credential extends Entity {
  constructor(credential: CredentialType) {
    super(credential);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Credential;
