const Event = require("./Event");

class ReservationCheckInEvent extends Event {
  constructor({ reservation, space, user }) {
    super({ reservation, space, user });
    this._id = reservation.id;
  }

  get name() {
    return "ReservationCheckInEvent";
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `reservation.${this._id}.checkedIn`;
  }
}

module.exports = ReservationCheckInEvent;
