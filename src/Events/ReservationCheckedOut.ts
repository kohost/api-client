import { ReservationSchema } from "../Models/Reservation";
import { AppEvents } from "../defs/amqpExchanges";
import { Event } from "./Event";

export class ReservationCheckedOut extends Event {
  constructor(reservation: ReservationSchema, context = {}) {
    super(reservation, context);
  }

  static get name() {
    return "ReservationCheckedOut";
  }

  get entity() {
    return "reservation" as const;
  }

  static get exchange() {
    return AppEvents.name;
  }
}

export default ReservationCheckedOut;
