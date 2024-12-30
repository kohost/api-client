import Event from "./event";

class SystemCourtesyUpdated extends Event {
  constructor(courtesy, context) {
    super(courtesy, context);
  }

  static get name() {
    return "SystemCourtesyUpdated";
  }

  static get entity() {
    return "courtesy";
  }
}

export default SystemCourtesyUpdated;
