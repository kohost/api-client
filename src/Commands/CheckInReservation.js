const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class CheckInReservation extends Command {
  constructor({ id, ...rest }) {
    if (!id) throw new RequestError("reservation id is required");
    super({ id, ...rest });
  }

  get name() {
    return "CheckInReservation";
  }
}

module.exports = CheckInReservation;
