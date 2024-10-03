import { Event } from "./Event";

export class SystemReservationUpdate extends Event {
  constructor(reservation, context) {
    super(reservation, context);
  }

  static get name() {
    return "SystemReservationUpdated";
  }

  static get entity() {
    return "reservation";
  }
}
