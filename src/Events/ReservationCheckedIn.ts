import { ReservationSchema } from "../Models/Reservation";
import { AppEvents } from "../utils/amqpExchanges";
import { Event } from "./Event";

export class ReservationCheckedIn extends Event {
  constructor(reservation: ReservationSchema, context = {}) {
    super(reservation, context);
  }

  static get name() {
    return "ReservationCheckedIn";
  }

  get entity() {
    return "reservation" as const;
  }

  static get exchange() {
    return AppEvents.name;
  }
}

export default ReservationCheckedIn;
