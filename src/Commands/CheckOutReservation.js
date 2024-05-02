const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class CheckOutReservation extends Command {
  constructor({ reservationId, userId, ...rest }) {
    if (!reservationId) throw new RequestError("reservation id is required");
    if (!userId) throw new RequestError("user id is required");
    super({ reservationId, userId, ...rest });
  }

  get name() {
    return "CheckOutReservation";
  }
}

module.exports = CheckOutReservation;
