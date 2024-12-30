import Event from "./event";

class SystemPropertyUpdate extends Event {
  constructor(property, context) {
    super(property, context);
  }

  static get name() {
    return "SystemPropertyUpdated";
  }

  static get entity() {
    return "property";
  }
}

export default SystemPropertyUpdate;
