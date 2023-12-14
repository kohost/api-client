import Command from "./Command";

interface DiscoverReservationSpaceCategoryAvailabilitiesCommandOptions {
  id: string;
  [key: string]: any;
}

class DiscoverReservationSpaceCategoryAvailabilitiesCommand extends Command {
  constructor(
    options: DiscoverReservationSpaceCategoryAvailabilitiesCommandOptions
  ) {
    super(options);
  }

  get name() {
    return "DiscoverReservationSpaceCategoryAvailabilities";
  }

  get routingKey() {
    return "reservation.discoverRoomUpsells";
  }
}

export default DiscoverReservationSpaceCategoryAvailabilitiesCommand;
