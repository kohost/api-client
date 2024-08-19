import { RequestError } from "../Errors";
import { Command } from "./Command";

export interface CheckOutReservationOptions {
  reservationId: string;
  userId: string;
}

export class CheckOutReservation extends Command {
  constructor(opts: CheckOutReservationOptions & { [key: string]: any }) {
    if (!opts.reservationId)
      throw new RequestError("reservation id is required");
    if (!opts.userId) throw new RequestError("user id is required");
    super(opts);
  }

  get name() {
    return "CheckOutReservation";
  }
}

export default CheckOutReservation;
