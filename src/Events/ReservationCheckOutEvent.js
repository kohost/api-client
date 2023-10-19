const Event = require("./Event");

class ReservationCheckOutEvent extends Event {
  constructor(reservation) {
    super(reservation);
  }

  get name() {
    return "ReservationCheckInEvent";
  }

  get routingKey() {
    return `${this.data[0].organizationId || "#"}.${this.data[0].propertyId || "#"}.reservation.ReservationCheckOutEvent`;
  }

  static get entity() {
    return "reservation"
  }
}

module.exports = ReservationCheckOutEvent;
