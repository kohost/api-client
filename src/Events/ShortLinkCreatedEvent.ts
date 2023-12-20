import ShortLink from "../Models/ShortLink";
import Event from "./Event";

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
