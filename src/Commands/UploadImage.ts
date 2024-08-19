import { Command } from "./Command";

export interface UploadImageOptions {
  id?: string;
  url: string;
  file?: File; // Assuming file is a File or Blob object
}

export class UploadImage extends Command {
  constructor(options: UploadImageOptions & { [key: string]: any }) {
    const { id, url, file, ...rest } = options;
    super({ id, url, file, ...rest });
  }

  get name() {
    return "UploadImage";
  }
}

export default UploadImage;
