const Event = require("./Event");

class SystemSwitchUpdatedEvent extends Event {
  constructor(_switch) {
    super(_switch);
  }

  get name() {
    return "SystemSwitchUpdated";
  }

  get routingKey() {
    return `switch.${this.keyId}.updated`;  
  }
}

module.exports = SystemSwitchUpdatedEvent;
