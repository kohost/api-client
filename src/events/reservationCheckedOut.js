import { amqpExchanges } from "../defs/amqpExchanges";
import { Event } from "./event";

export class ReservationCheckedOut extends Event {
  constructor(reservation, context) {
    super(reservation, context);
  }

  static get name() {
    return "ReservationCheckedOut";
  }

  static get entity() {
    return "reservation";
  }

  static get exchange() {
    return amqpExchanges.AppEvents.name;
  }
}
