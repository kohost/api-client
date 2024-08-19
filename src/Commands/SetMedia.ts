import { MediaSourceSchema } from "../Models/MediaSource";
import { Command } from "./Command";

export interface SetMediaOptions {
  id: string;
  command: MediaSourceSchema["command"];
}

export class SetMedia extends Command {
  constructor(options: SetMediaOptions & { [key: string]: any }) {
    const { id, command, ...rest } = options;
    super({ id, command, ...rest });
  }

  get name() {
    return "SetMedia";
  }
}

export default SetMedia;
