const Event = require("./Event");

class ReservationSpaceChanged extends Event {
  constructor(reservation, context) {
    super(reservation, context);
  }

  static get name() {
    return "ReservationSpaceChanged";
  }

  static get entity() {
    return "reservation";
  }
}

module.exports = ReservationSpaceChanged;
