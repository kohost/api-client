import { RequestError } from "../Errors";
import { Command } from "./Command";

export class GetReservations extends Command {
  constructor(options) {
    if (!options) throw new RequestError("options are required");
    const { id, startDate, endDate, status, ...rest } = options;
    super({ id, startDate, endDate, status, ...rest });
  }

  get name() {
    return "GetReservations";
  }
}
