import { CourtesySchema } from "../Models/Courtesy";
import { Command } from "./Command";

export interface SetCourtesyOptions {
  id: string;
  state: CourtesySchema["state"];
}

export class SetCourtesy extends Command {
  constructor(options: SetCourtesyOptions & { [key: string]: any }) {
    const { id, state, ...rest } = options;
    super({ id, state, ...rest });
  }

  get name() {
    return "SetCourtesy";
  }
}

export default SetCourtesy;
