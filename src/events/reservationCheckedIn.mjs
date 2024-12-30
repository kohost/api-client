import { amqpExchanges } from "../defs/amqpExchanges";
import { Event } from "./event.mjs";

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
    return amqpExchanges.AppEvents.name;
  }
}
