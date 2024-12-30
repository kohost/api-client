import Command from "./command";

class CreateImageUploadEndpoint extends Command {
  constructor({ id, expires, ...rest }) {
    super({ id, expires, ...rest });
  }

  get name() {
    return "CreateImageUploadEndpoint";
  }
}

export default CreateImageUploadEndpoint;
