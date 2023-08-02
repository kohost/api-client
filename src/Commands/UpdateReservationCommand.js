const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class UpdateReservationCommand extends Command {
  constructor({ id, ...rest }) {
    if (!id) throw new RequestError("document type is required");
    super({ id, ...rest });
  }

  get name() {
    return "UpdateReservation";
  }

  get routingKey() {
    return `reservation.${this.data.id}.update`;
  }
}

module.exports = UpdateReservationCommand;
