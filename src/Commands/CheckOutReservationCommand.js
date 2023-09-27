const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class CheckOutReservationCommand extends Command {
  constructor({ reservationId, userId, ...rest }) {
    if (!reservationId) throw new RequestError("reservation id is required");
    if (!userId) throw new RequestError("user id is required");
    super({ reservationId, userId, ...rest });
  }

  get name() {
    return "CheckOutReservation";
  }

  get routingKey() {
    return `reservation.${this.data.id}.checkout`;
  }
}

module.exports = CheckOutReservationCommand;
