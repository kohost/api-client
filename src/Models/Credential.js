// create the Credential Model
import schema, { properties } from "../schemas/credential.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Credential extends Entity {
  /**
   * @typedef {import("../schemas/CredentialSchema").Credential} CredentialType
   * Create a Credential instance.
   * @constructor
   * @param {CredentialType} credential - The credential object of type Credential.
   */
  constructor(credential) {
    super(credential);
  }
}

Object.defineProperty(Credential.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Credential.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Credential, "validProperties", {
  value: Object.keys(properties),
});
