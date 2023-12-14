import Command from "./Command";

interface UploadImageCommandOptions {
  id: string;
  url: string;
  [key: string]: any;
}

class UploadImageCommand extends Command {
  constructor(options: UploadImageCommandOptions) {
    super(options);
  }

  get name() {
    return "UploadImage";
  }

  get routingKey() {
    return `image.${this.data.id}.upload`;
  }
}

export default UploadImageCommand;
