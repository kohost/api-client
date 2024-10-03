import { Event } from "./Event";

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
