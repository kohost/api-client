import { Command } from "./command.mjs";

export class CheckInReservation extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "CheckInReservation";
  }
}
