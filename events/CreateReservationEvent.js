const Event = require("./Event");

class CreateReservationEvent extends Event {
  constructor(reservation) {
    super(reservation);
  }

  get name() {
    return "CreateReservation";
  }

  get exchange() {
    return "Reservations";
  }

  get routingKey() {
    return `reservation.${this.id}.created`;
  }
}

module.exports = CreateReservationEvent;
