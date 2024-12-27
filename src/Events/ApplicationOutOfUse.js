import { amqpExchanges } from "../defs";
import Event from "./Event";

class ApplicationOutOfUse extends Event {
  constructor(data = {}, context = {}) {
    super(data, context);
  }

  static get name() {
    return "ApplicationOutOfUse";
  }

  static get entity() {
    return "app";
  }

  static get exchange() {
    return amqpExchanges.AppEvents.name;
  }
}

export default ApplicationOutOfUse;
