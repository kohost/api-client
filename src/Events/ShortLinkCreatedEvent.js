const Event = require("./Event");

class ShortLinkCreatedEvent extends Event {
  constructor(shortLink, context) {
    super(shortLink, context);
  }

  static get name() {
    return "ShortLinkCreated";
  }

  static get entity() {
    return "shortLink";
  }
}

module.exports = ShortLinkCreatedEvent;
