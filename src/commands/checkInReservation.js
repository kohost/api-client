import Command from "./command";

class CheckInReservation extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "CheckInReservation";
  }
}

export default CheckInReservation;
