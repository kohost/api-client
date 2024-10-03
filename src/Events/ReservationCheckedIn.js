import { exchanges } from "../defs";
import { Event } from "./Event";

export class ReservationCheckedIn extends Event {
  constructor(reservation, context) {
    super(reservation, context);
  }

  static get name() {
    return "ReservationCheckedIn";
  }

  static get entity() {
    return "reservation";
  }

  static get exchange() {
    return exchanges.AppEvents.name;
  }
}
