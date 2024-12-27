import { amqpExchanges } from "../defs/amqpExchanges";
import Event from "./Event";

class ReservationCheckedOut extends Event {
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

export default ReservationCheckedOut;
