import Command from "./Command";

interface CreateImageUploadEndpointCommandOptions {
  id: string;
  expires: string | Date;
  [key: string]: any;
}

class CreateImageUploadEndpointCommand extends Command {
  constructor(options: CreateImageUploadEndpointCommandOptions) {
    super(options);
  }

  get name() {
    return "CreateImageUploadEndpoint";
  }

  get routingKey() {
    return "image.createUploadEndpoint";
  }
}

export default CreateImageUploadEndpointCommand;
