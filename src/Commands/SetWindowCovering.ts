import { Command } from "./Command";

export interface SetWindowCoveringOptions {
  id: string;
  position: number;
}

export class SetWindowCovering extends Command {
  constructor(options: SetWindowCoveringOptions & { [key: string]: any }) {
    const { id, position, ...rest } = options;
    super({ id, position, ...rest });
  }

  get name() {
    return "SetWindowCovering";
  }
}

export default SetWindowCovering;
