import Credential from "../Models/Credential";
import Event from "./Event";

class SystemCredentialUpdatedEvent extends Event {
  constructor(credential: Credential) {
    super(credential);
  }

  get name() {
    return "SystemCredentialUpdated";
  }

  get routingKey() {
    return `credential.${this.keyId}.updated`;
  }
}

export default SystemCredentialUpdatedEvent;
