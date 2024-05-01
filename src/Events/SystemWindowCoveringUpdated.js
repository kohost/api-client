const Event = require("./Event");

class SystemWindowCoveringUpdate extends Event {
  constructor(wc, context) {
    super(wc, context);
  }

  static get name() {
    return "SystemWindowCoveringUpdated";
  }

  static get entity() {
    return "windowCovering";
  }
}

module.exports = SystemWindowCoveringUpdate;
