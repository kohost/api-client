import Reservation from "../Models/Reservation";
import Event from "./Event";

class SystemReservationUpdatedEvent extends Event {
  constructor(reservation: Reservation) {
    super(reservation);
  }

  get name() {
    return "SystemReservationUpdated";
  }

  get routingKey() {
    return `reservation.${this.keyId}.updated`;
  }
}

export default SystemReservationUpdatedEvent;
