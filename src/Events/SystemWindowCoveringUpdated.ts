import { WindowCoveringSchema } from "../Models/WindowCovering";
import { Event } from "./Event";

class SystemWindowCoveringUpdate extends Event {
  constructor(wc: WindowCoveringSchema, context = {}) {
    super(wc, context);
  }

  static get name() {
    return "SystemWindowCoveringUpdated";
  }

  get entity() {
    return "windowCovering" as const;
  }
}

export default SystemWindowCoveringUpdate;
