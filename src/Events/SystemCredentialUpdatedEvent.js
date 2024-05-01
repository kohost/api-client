const Event = require("./Event");

class SystemCredentialUpdatedEvent extends Event {
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

module.exports = SystemCredentialUpdatedEvent;
