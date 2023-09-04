const Event = require("./Event");

class SystemCredentialUpdatedEvent extends Event {
  constructor(data) {
    super(data);
  }

  get name() {
    return "SystemCredentialUpdated";
  }

  get routingKey() {
    return `credential.${this.keyId}.updated`;
  }
}

module.exports = SystemCredentialUpdatedEvent;
