import { RequestError } from "../Errors";
import { ReservationSchema } from "./../Models/Reservation";
import { Command } from "./Command";

export interface GetReservationsOptions {
  id?: string;
  includeRevenue?: boolean;
  startDate?: string | Date;
  endDate?: string | Date;
  status?: ReservationSchema["status"];
  confirmationNumber?: string;
}

export class GetReservations extends Command {
  constructor(options: GetReservationsOptions & { [key: string]: any }) {
    if (!options) throw new RequestError("options are required");
    const { id, startDate, endDate, status, ...rest } = options;
    super({ id, startDate, endDate, status, ...rest });
  }

  get name() {
    return "GetReservations";
  }
}

export default GetReservations;
