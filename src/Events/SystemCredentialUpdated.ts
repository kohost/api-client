import { CredentialSchema } from "../Models/Credential";
import { Event } from "./Event";

class SystemCredentialUpdated extends Event {
  constructor(cred: CredentialSchema, context = {}) {
    super(cred, context);
  }

  static get name() {
    return "SystemCredentialUpdated";
  }

  get entity() {
    return "credential" as const;
  }
}

export default SystemCredentialUpdated;
