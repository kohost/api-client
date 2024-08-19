import RequestError from "../Errors/RequestError";
import { Command } from "./Command";

export interface CheckInReservationOptions {
  id: string;
}

export class CheckInReservation extends Command {
  constructor(opts: CheckInReservationOptions & { [key: string]: any }) {
    if (!opts.id) throw new RequestError("Reservation id is required");
    super(opts);
  }

  get name() {
    return "CheckInReservation";
  }
}
