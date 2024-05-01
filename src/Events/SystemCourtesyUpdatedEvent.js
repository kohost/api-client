const Event = require("./Event");

class SystemCourtesyUpdatedEvent extends Event {
  constructor(courtesy, context) {
    super(courtesy, context);
  }

  static get name() {
    return "SystemCourtesyUpdated";
  }

  static get entity() {
    return "courtesy";
  }
}

module.exports = SystemCourtesyUpdatedEvent;
