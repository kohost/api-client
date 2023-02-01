const Event = require("./Event");

class SystemUserUpdatedEvent extends Event {
  constructor(user) {
    super(user);
  }

  get name() {
    return "SystemUserUpdated";
  }

  get routingKey() {
    return `user.${this.data.id}.updated`;
  }
}

module.exports = SystemUserUpdatedEvent;
