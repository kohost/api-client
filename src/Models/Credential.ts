// create the Credential Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type CredentialSchema } from "../schemas/credential.json";
import Entity from "./Entity";

registerSchema(schema);

interface Credential extends CredentialSchema {}

class Credential extends Entity {
  constructor(credential: CredentialSchema) {
    super(credential);
  }
}

Credential.validator = compileSchema(schema);
Credential.schema = schema;
Credential.validProperties = Object.keys(schema.properties);

export default Credential;
