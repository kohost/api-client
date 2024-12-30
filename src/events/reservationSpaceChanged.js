import { amqpExchanges } from "../defs/amqpExchanges";
import Event from "./event";

export default class ReservationSpaceChanged extends Event {
  constructor(reservation, context) {
    super(reservation, context);
  }

  static get name() {
    return "ReservationSpaceChanged";
  }

  static get entity() {
    return "reservation";
  }

  static get exchange() {
    return amqpExchanges.AppEvents.name;
  }
}
