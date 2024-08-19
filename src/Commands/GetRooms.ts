import { SpaceSchema } from "../Models/Space";
import { Command } from "./Command";

export interface GetRoomsOptions {
  id?: string;
  types?: SpaceSchema["discriminator"][];
  categories?: string[];
  startDate?: string | Date;
  endDate?: string | Date;
  serviceStatus?: SpaceSchema["serviceStatus"][];
  housekeepingStatus?: SpaceSchema["housekeepingStatus"][];
  features?: SpaceSchema["features"][];
  checkInDateTime?: string | Date;
  checkOutDateTime?: string | Date;
}

export class GetRooms extends Command {
  constructor(options: GetRoomsOptions & { [key: string]: any }) {
    const {
      id,
      types,
      categories,
      startDate,
      endDate,
      serviceStatus,
      housekeepingStatus,
      ...rest
    } = options;
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
