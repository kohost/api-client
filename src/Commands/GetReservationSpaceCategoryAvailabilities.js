import Command from "./Command";

class GetReservationSpaceCategoryAvailabilities extends Command {
  constructor(options) {
    const { id, ...rest } = options;
    super({ id, ...rest });
  }

  get name() {
    return "GetReservationSpaceCategoryAvailabilities";
  }
}

export default GetReservationSpaceCategoryAvailabilities;
