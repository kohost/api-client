import Event from "./Event";

class ShortLinkCreated extends Event {
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

export default ShortLinkCreated;
