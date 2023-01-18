const Event = require("./Event");

class ShortLinkCreatedEvent extends Event {
  constructor(shortLink, context) {
    super(shortLink, context);
  }

  get name() {
    return "ShortLinkCreated";
  }

  get routingKey() {
    return `shortlink.${this.data.id}.created`;
  }
}

module.exports = ShortLinkCreatedEvent;
