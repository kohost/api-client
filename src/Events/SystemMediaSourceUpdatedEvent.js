const Event = require("./Event");

class SystemMediaSourceUpdatedEvent extends Event {
  constructor(mediaSource, context) {
    super(mediaSource, context);
  }

  static get name() {
    return "SystemMediaSourceUpdated";
  }

  static get entity() {
    return "mediaSource";
  }
}

module.exports = SystemMediaSourceUpdatedEvent;
