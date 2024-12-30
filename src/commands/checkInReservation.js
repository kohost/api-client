import { Command } from "./command";

export class CheckInReservation extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "CheckInReservation";
  }
}
