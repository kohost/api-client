import Command from "./Command";

interface UpdateUserCommandOptions {
  id: string;
  email?: string;
  phone?: string;
  identification?: any;
  address?: any;
  note?: string;
  nationality?: string;
  file?: any;
  payment?: any;
  [key: string]: any;
}

class UpdateUserCommand extends Command {
  constructor(options: UpdateUserCommandOptions) {
    super(options);
  }

  get name() {
    return "UpdateUser";
  }

  get routingKey() {
    return `user.${this.data.id}.update`;
  }
}

export default UpdateUserCommand;
