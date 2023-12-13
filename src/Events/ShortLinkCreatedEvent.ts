import Event from "./Event";

type ShortLink = import("../types/ShortLinkSchema").ShortLink;

class ShortLinkCreatedEvent extends Event {
  constructor(shortLink: ShortLink, context = {}) {
    super(shortLink, context);
  }

  get name() {
    return "ShortLinkCreated";
  }

  get routingKey() {
    return `shortlink.${this.keyId}.created`;
  }
}

export default ShortLinkCreatedEvent;
