import { RequestError } from "../Errors";
import { Command } from "./Command";

export class UpdateReservation extends Command {
  constructor({ id, ...rest }) {
    if (!id) throw new RequestError("document type is required");
    super({ id, ...rest });
  }

  get name() {
    return "UpdateReservation";
  }
}
