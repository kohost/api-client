import Command from "./Command";

interface DiscoverRoomsCommandOptions {
  id: string | string[];
  types?:
    | "classRoom"
    | "hotelRoom"
    | "office"
    | "building"
    | "commonArea"
    | "conferenceRoom"
    | "lobby"
    | "gym"
    | "pool"
    | "restaurant";
  categories?: string[];
  checkInDateTime?: string | Date;
  checkOutDateTime?: string | Date;
  housekeepingStatus?: "clean" | "dirty" | "inspected" | "pickup";
  serviceStatus: "inService" | "outOfService" | "outOfOrder";
  [key: string]: any;
}

class DiscoverRoomsCommand extends Command {
  constructor(options: DiscoverRoomsCommandOptions) {
    super(options);
  }

  get name() {
    return "DiscoverRooms";
  }

  get routingKey() {
    if (typeof this.data.id === "string") return `rooms.${this.data.id}.get`;
    if (Array.isArray(this.data.id)) return "rooms.batch.get";
    return "rooms.get";
  }
}

export default DiscoverRoomsCommand;
