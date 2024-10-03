import { exchanges } from "../defs";
import { Event } from "./Event";

export class ApplicationInUse extends Event {
  constructor(data = {}, context) {
    super(data, context);
  }

  static get name() {
    return "ApplicationInUse";
  }

  static get entity() {
    return "app";
  }

  static get exchange() {
    return exchanges.AppEvents.name;
  }
}
