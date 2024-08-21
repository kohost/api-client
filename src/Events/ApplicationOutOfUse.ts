import { AppEvents } from "../utils/amqpExchanges";
import { Event } from "./Event";

export class ApplicationOutOfUse extends Event {
  constructor(data = {}, context = {}) {
    super(data, context);
  }

  static get name() {
    return "ApplicationOutOfUse";
  }

  get entity() {
    return "app" as const;
  }

  static get exchange() {
    return AppEvents.name;
  }
}

export default ApplicationOutOfUse;
