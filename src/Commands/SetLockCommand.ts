import Command from "./Command";

interface SetLockCommandOptions {
  id: string;
  state: "locked" | "unlocked";
  [key: string]: any;
}

class SetLockCommand extends Command {
  constructor(options: SetLockCommandOptions) {
    super(options);
  }

  get name() {
    return "SetLock";
  }

  get routingKey() {
    return `lock.${this.data.id}.set`;
  }
}

export default SetLockCommand;
