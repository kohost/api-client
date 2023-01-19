const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class CheckInReservationCommand extends Command {
  constructor({ id }) {
    if (!id) throw new RequestError("document type is required");
    super({ id });
  }

  get name() {
    return "CheckInReservation";
  }

  get routingKey() {
    return `reservation.${this.data.id}.checkin`;
  }

  get replyTo() {
    return "system.response.reservations";
  }
}

module.exports = CheckInReservationCommand;
