import { ReservationSchema } from "../Models/Reservation";
import { Event } from "./Event";

class SystemReservationUpdate extends Event {
  constructor(reservation: ReservationSchema, context = {}) {
    super(reservation, context);
  }

  static get name() {
    return "SystemReservationUpdated";
  }

  get entity() {
    return "reservation" as const;
  }
}

export default SystemReservationUpdate;
