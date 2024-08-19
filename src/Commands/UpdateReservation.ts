import { RequestError } from "../Errors";
import { Command } from "./Command";

export interface UpdateReservationOptions {
  id: string;
  space?: string;
  spaceCategory?: string;
  checkInDateTime?: string | Date;
  checkOutDateTime?: string | Date;
}

export class UpdateReservation extends Command {
  constructor(options: UpdateReservationOptions & { [key: string]: any }) {
    const { id, ...rest } = options;
    if (!id) throw new RequestError("id is required");
    super({ id, ...rest });
  }

  get name() {
    return "UpdateReservation";
  }
}

export default UpdateReservation;
