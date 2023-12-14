import Command from "./Command";

interface OCRDocumentCommandOptions {
  type: "passport" | "driversLicense" | "identityCard";
  image: {
    data: string;
    fileName: string;
    filePath: string;
    contentType: string;
  };
  [key: string]: any;
}

class OCRDocumentCommand extends Command {
  constructor(options: OCRDocumentCommandOptions) {
    super(options);
  }

  get name() {
    return "OCRDocument";
  }
}

export default OCRDocumentCommand;
