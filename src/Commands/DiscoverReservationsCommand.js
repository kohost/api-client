const { RequestError } = require("../Errors");
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
}

module.exports = DiscoverReservationsCommand;
