import Event from "./event";

class SystemDimmerUpdated extends Event {
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

export default SystemDimmerUpdated;
