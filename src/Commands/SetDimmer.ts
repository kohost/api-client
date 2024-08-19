import { Command } from "./Command";

export interface SetDimmerOptions {
  id: string;
  level: number;
}

export class SetDimmer extends Command {
  constructor(options: SetDimmerOptions & { [key: string]: any }) {
    const { id, level, ...rest } = options;
    super({ id, level, ...rest });
  }

  get name() {
    return "SetDimmer";
  }
}

export default SetDimmer;
