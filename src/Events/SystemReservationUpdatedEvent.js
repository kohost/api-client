const Event = require("./Event");

class SystemReservationUpdatedEvent extends Event {
  constructor(reservation) {
    super(reservation);
  }

  get name() {
    return "SystemReservationUpdated";
  }

  get routingKey() {
    return `reservation.${this.keyId}.updated`;
  }
}

module.exports = SystemReservationUpdatedEvent;
