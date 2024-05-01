const Event = require("./Event");

class SystemCategoryUpdatedEvent extends Event {
  constructor(category, context) {
    super(category, context);
  }

  static get name() {
    return "SystemCategoryUpdated";
  }

  static get entity() {
    return "category";
  }
}

module.exports = SystemCategoryUpdatedEvent;
