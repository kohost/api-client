import { Command } from "./command";

export class UpdateReservation extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "UpdateReservation";
  }
}
