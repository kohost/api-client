import { Event } from "./event";

export class SystemCredentialUpdated extends Event {
  constructor(cred, context) {
    super(cred, context);
  }

  static get name() {
    return "SystemCredentialUpdated";
  }

  static get entity() {
    return "credential";
  }
}
