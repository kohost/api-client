import { RequestError } from "../Errors";
import { Command } from "./Command";

export class GetReservationSpaceCategoryAvailabilities extends Command {
  constructor(options) {
    if (!options) throw new RequestError("options are required");
    const { id, ...rest } = options;
    super({ id, ...rest });
  }

  get name() {
    return "GetReservationSpaceCategoryAvailabilities";
  }
}
