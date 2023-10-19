const Event = require("./Event");

class ReservationCheckInEvent extends Event {
  constructor(reservation) {
    super(reservation);
  }

  get name() {
    return "ReservationCheckInEvent";
  }

  get routingKey() {
    return `${this.data[0].organizationId || "#"}.${this.data[0].propertyId || "#"}.reservation.ReservationCheckInEvent`;
  }

  static get entity() {
    return "reservation"
  }
}

module.exports = ReservationCheckInEvent;
