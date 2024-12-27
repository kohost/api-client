import Command from "./Command";

class UploadImage extends Command {
  constructor({ id, url, file, ...rest }) {
    super({ id, url, file, ...rest });
  }

  get name() {
    return "UploadImage";
  }
}

export default UploadImage;
