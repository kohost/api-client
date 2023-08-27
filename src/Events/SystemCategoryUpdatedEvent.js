const Event = require("./Event");

class SystemCategoryUpdatedEvent extends Event {
  constructor(space) {
    super(space);
  }

  get name() {
    return "SystemCategoryUpdated";
  }

  get routingKey() {
    return `category.${this.keyId}.updated`;
  }
}

module.exports = SystemCategoryUpdatedEvent;
