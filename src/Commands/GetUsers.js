import Command from "./Command";

class GetUsers extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "GetUsers";
  }
}

export default GetUsers;
