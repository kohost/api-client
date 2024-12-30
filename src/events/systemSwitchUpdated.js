import Event from "./event";

class SystemSwitchUpdate extends Event {
  constructor(_switch, context) {
    super(_switch, context);
  }

  static get name() {
    return "SystemSwitchUpdated";
  }

  static get entity() {
    return "switch";
  }
}

export default SystemSwitchUpdate;
