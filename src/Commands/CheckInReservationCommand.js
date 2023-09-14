const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class CheckInReservationCommand extends Command {
  constructor({ id, ...rest }) {
    if (!id) throw new RequestError("reservation id is required");
    super({ id, ...rest });
  }

  get name() {
    return "CheckInReservation";
  }

  get routingKey() {
    return `reservation.${this.data.id}.checkin`;
  }
}

module.exports = CheckInReservationCommand;
