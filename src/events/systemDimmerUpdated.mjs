import { Event } from "./event";

export class SystemDimmerUpdated extends Event {
  constructor(dimmer, context) {
    super(dimmer, context);
  }

  static get name() {
    return "SystemDimmerUpdated";
  }

  static get entity() {
    return "dimmer";
  }
}
