import { Command } from "./command.mjs";

export class GetReservationSpaceCategoryAvailabilities extends Command {
  constructor(options) {
    const { id, ...rest } = options;
    super({ id, ...rest });
  }

  get name() {
    return "GetReservationSpaceCategoryAvailabilities";
  }
}
