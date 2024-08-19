import { RequestError } from "../Errors/RequestError";
import { Command } from "./Command";

export interface GetReservationSpaceCategoryAvailabilitiesOptions {
  id?: string;
}

export class GetReservationSpaceCategoryAvailabilities extends Command {
  constructor(
    options: GetReservationSpaceCategoryAvailabilitiesOptions & {
      [key: string]: any;
    }
  ) {
    if (!options) throw new RequestError("options are required");
    const { id, ...rest } = options;
    super({ id, ...rest });
  }

  get name() {
    return "GetReservationSpaceCategoryAvailabilities";
  }
}

export default GetReservationSpaceCategoryAvailabilities;
