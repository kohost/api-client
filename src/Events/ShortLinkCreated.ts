import { ShortLinkSchema } from "../Models/ShortLink";
import { Event } from "./Event";

export class ShortLinkCreated extends Event {
  constructor(shortLink: ShortLinkSchema, context = {}) {
    super(shortLink, context);
  }

  static get name() {
    return "ShortLinkCreated";
  }

  get entity() {
    return "shortLink" as const;
  }
}

export default ShortLinkCreated;
