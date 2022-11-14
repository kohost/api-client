const Event = require("./Event");

class UpdateReservationEvent extends Event {
  constructor(reservation) {
    super(reservation);
  }

  get name() {
    return "UpdateReservation";
  }

  get routingKey() {
    return `reservation.${this.id}.updated`;
  }
}

module.exports = UpdateReservationEvent;
