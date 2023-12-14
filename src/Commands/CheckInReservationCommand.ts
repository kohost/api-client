import Command from "./Command";
import RequestError from "../Errors/RequestError";

interface CheckInReservationCommandOptions {
  id: string;
  [key: string]: any;
}

class CheckInReservationCommand extends Command {
  constructor(options: CheckInReservationCommandOptions) {
    if (!options.id) throw new RequestError("reservation id is required");
    super(options);
  }

  get name() {
    return "CheckInReservation";
  }

  get routingKey() {
    return `reservation.${this.data.id}.checkin`;
  }
}

export default CheckInReservationCommand;
