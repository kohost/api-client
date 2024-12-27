import Command from "./Command";

class GetRooms extends Command {
  constructor({
    id,
    types,
    categories,
    startDate,
    endDate,
    serviceStatus,
    housekeepingStatus,
    ...rest
  }) {
    super({
      id,
      types,
      categories,
      startDate,
      endDate,
      serviceStatus,
      housekeepingStatus,
      ...rest,
    });
  }

  get name() {
    return "GetRooms";
  }
}

export default GetRooms;
