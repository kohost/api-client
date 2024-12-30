import { Event } from "./event.mjs";

export class SystemSpaceUpdate extends Event {
  constructor(space, context) {
    super(space, context);
  }

  static get name() {
    return "SystemSpaceUpdated";
  }

  static get entity() {
    return "space";
  }
}
