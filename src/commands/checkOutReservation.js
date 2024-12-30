import Command from "./command";

class CheckOutReservation extends Command {
  constructor({ reservationId, userId, ...rest }) {
    super({ reservationId, userId, ...rest });
  }

  get name() {
    return "CheckOutReservation";
  }
}

export default CheckOutReservation;
