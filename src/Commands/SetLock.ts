import { LockSchema } from "../Models/Lock";
import { Command } from "./Command";

export interface SetLockOptions {
  id: string;
  state: LockSchema["state"];
}

export class SetLock extends Command {
  constructor(options: SetLockOptions & { [key: string]: any }) {
    const { id, state, ...rest } = options;
    super({ id, state, ...rest });
  }

  get name() {
    return "SetLock";
  }
}

export default SetLock;
