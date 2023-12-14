import Command from "./Command";

interface DiscoverUsersCommandOptions {
  id: string | string[];
  firstName?: string;
  lastName?: string;
  email?: string;
  includeRevenue?: boolean;
  [key: string]: any;
}

class DiscoverUsersCommand extends Command {
  constructor(options: DiscoverUsersCommandOptions) {
    super(options);
  }

  get name() {
    return "DiscoverUsers";
  }

  get routingKey() {
    if (typeof this.data.id === "string") return `users.${this.data.id}.get`;
    if (Array.isArray(this.data.id)) return "users.batch.get";
    return "users.get";
  }
}

export default DiscoverUsersCommand;
