import { RequestError } from "../Errors";
import { Command } from "./Command";

export class CheckInReservation extends Command {
  constructor({ id, ...rest }) {
    if (!id) throw new RequestError("reservation id is required");
    super({ id, ...rest });
  }

  get name() {
    return "CheckInReservation";
  }
}
