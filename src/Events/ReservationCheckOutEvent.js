const Event = require("./Event");

class ReservationCheckOutEvent extends Event {
  constructor(reservation, context) {
    super(reservation, context);
  }

  static get name() {
    return "ReservationCheckIn";
  }

  static get entity() {
    return "reservation";
  }
}

module.exports = ReservationCheckOutEvent;
