const { RequestError } = require("../errors");
const Command = require("./Command");

class DiscoverReservationsCommand extends Command {
  constructor(options) {
    if (!options) throw new RequestError("options are required");
    const { id, startDate, endDate, status } = options;
    super({ id, startDate, endDate, status });
  }

  get name() {
    return "DiscoverReservations";
  }

  get routingKey() {
    return "reservation.discover";
  }

  get replyTo() {
    return "system.response.reservations";
  }
}

module.exports = DiscoverReservationsCommand;
