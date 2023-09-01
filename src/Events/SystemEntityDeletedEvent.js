const Event = require("./Event");

class SystemEntityDeletedEvent extends Event {
  constructor(data) {
    super(data);
  }

  get name() {
    return "SystemEntityDeleted";
  }

  get routingKey() {
    return `entity.${this.keyId}.deleted`;
  }
}

module.exports = SystemEntityDeletedEvent;
