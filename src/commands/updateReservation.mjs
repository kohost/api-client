import { Command } from "./command.mjs";

export class UpdateReservation extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "UpdateReservation";
  }
}
