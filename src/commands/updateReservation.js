import Command from "./command";

class UpdateReservation extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "UpdateReservation";
  }
}

export default UpdateReservation;
