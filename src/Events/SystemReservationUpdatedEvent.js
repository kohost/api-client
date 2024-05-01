const Event = require("./Event");

class SystemReservationUpdatedEvent extends Event {
  constructor(reservation, context) {
    super(reservation, context);
  }

  static get name() {
    return "SystemReservationUpdated";
  }

  static get entity() {
    return "reservation";
  }
}

module.exports = SystemReservationUpdatedEvent;
