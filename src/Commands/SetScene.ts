import { Command } from "./Command";

export interface SetSceneOptions {
  id: string;
  devices: any[]; // Consider creating a more specific type for devices
}

export class SetScene extends Command {
  constructor(options: SetSceneOptions & { [key: string]: any }) {
    const { id, devices, ...rest } = options;
    super({ id, devices, ...rest });
  }

  get name() {
    return "SetScene";
  }
}

export default SetScene;
