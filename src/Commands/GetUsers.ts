import { Command } from "./Command";

export interface GetUsersOptions {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  includeRevenue?: boolean;
}

export class GetUsers extends Command {
  constructor(options: GetUsersOptions & { [key: string]: any }) {
    const { id, ...rest } = options;
    super({ id, ...rest });
  }

  get name() {
    return "GetUsers";
  }
}

export default GetUsers;
