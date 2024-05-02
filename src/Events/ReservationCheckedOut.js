const Event = require("./Event");

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
}

module.exports = ReservationCheckedOut;
