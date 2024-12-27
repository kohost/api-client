import Command from "./Command";

class GetCategories extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "GetCategories";
  }
}

export default GetCategories;
