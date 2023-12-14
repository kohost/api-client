import Command from "./Command";
import RequestError from "../Errors/RequestError";

interface CheckOutReservationCommandOptions {
  reservationId: string;
  userId: string;
  [key: string]: any;
}

class CheckOutReservationCommand extends Command {
  constructor(options: CheckOutReservationCommandOptions) {
    if (!options.reservationId)
      throw new RequestError("reservation id is required");
    if (!options.userId) throw new RequestError("user id is required");
    super(options);
  }

  get name() {
    return "CheckOutReservation";
  }

  get routingKey() {
    return `reservation.${this.data.id}.checkout`;
  }
}

export default CheckOutReservationCommand;
