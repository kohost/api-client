import Event from "./Event";

type Reservation = import("../types/ReservationSchema").Reservation;

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
