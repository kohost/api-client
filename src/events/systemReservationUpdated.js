import { Event } from "./event";

export class SystemReservationUpdated extends Event {
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
