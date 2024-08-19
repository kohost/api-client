import { ReservationSchema } from "../Models/Reservation";
import { AppEvents } from "../defs/amqpExchanges";
import { Event } from "./Event";

export class ReservationSpaceChanged extends Event {
  constructor(reservation: ReservationSchema, context = {}) {
    super(reservation, context);
  }

  static get name() {
    return "ReservationSpaceChanged";
  }

  get entity() {
    return "reservation" as const;
  }

  static get exchange() {
    return AppEvents.name;
  }
}

export default ReservationSpaceChanged;
