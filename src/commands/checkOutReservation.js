import { Command } from "./command";

export class CheckOutReservation extends Command {
  constructor({ reservationId, userId, ...rest }) {
    super({ reservationId, userId, ...rest });
  }

  get name() {
    return "CheckOutReservation";
  }
}
