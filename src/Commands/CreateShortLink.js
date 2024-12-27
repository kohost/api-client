import Command from "./Command";

class CreateShortLink extends Command {
  constructor({ title, destination, ...rest }) {
    super({ title, destination, ...rest });
  }

  get name() {
    return "CreateShortLink";
  }
}

export default CreateShortLink;
