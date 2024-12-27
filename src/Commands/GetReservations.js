import Command from "./Command";

class GetReservations extends Command {
  constructor(options) {
    const { id, startDate, endDate, status, ...rest } = options;
    super({ id, startDate, endDate, status, ...rest });
  }

  get name() {
    return "GetReservations";
  }
}

export default GetReservations;
