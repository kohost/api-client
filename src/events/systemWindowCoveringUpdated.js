import { Event } from "./event";

export class SystemWindowCoveringUpdated extends Event {
  constructor(wc, context) {
    super(wc, context);
  }

  static get name() {
    return "SystemWindowCoveringUpdated";
  }

  static get entity() {
    return "windowCovering";
  }
}
