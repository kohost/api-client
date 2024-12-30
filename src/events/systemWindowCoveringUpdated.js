import Event from "./event";

class SystemWindowCoveringUpdate extends Event {
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

export default SystemWindowCoveringUpdate;
