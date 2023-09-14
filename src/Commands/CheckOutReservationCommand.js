const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class CheckOutReservationCommand extends Command {
  constructor({ id, ...rest }) {
    if (!id) throw new RequestError("reservation id is required");
    super({ id, ...rest });
  }

  get name() {
    return "CheckOutReservation";
  }

  get routingKey() {
    return `reservation.${this.data.id}.checkout`;
  }
}

module.exports = CheckOutReservationCommand;
