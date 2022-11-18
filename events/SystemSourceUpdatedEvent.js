const Event = require("./Event");

class SystemSourceUpdatedEvent extends Event {
  constructor(source) {
    super(source);
  }

  get name() {
    return "SystemSourceUpdated";
  }

  get routingKey() {
    return `source.${this.data.id}.updated`;
  }
}

module.exports = SystemSourceUpdatedEvent;
