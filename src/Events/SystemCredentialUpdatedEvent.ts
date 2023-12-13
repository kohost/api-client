import Event from "./Event";

type Credential = import("../types/CredentialSchema").Credential;

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
