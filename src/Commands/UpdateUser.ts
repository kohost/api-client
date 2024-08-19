import { RequestError } from "../Errors";
import { IdentificationSchema } from "../Models/Identification";
import { Command } from "./Command";

interface UpdateUserOptionsIdentification {
  type: IdentificationSchema["type"];
  expires: string | Date;
  firstName?: string;
  lastName?: string;
  number: string;
  dob?: string | Date;
  issuingCountry?: string;
}

interface UpdateUserOptionsPayment {
  storageData: string;
  expires: string | Date;
  maskedNumber?: string;
  type?: string;
  issued?: string | Date;
}

export interface UpdateUserOptions {
  id: string;
  email?: string;
  phone?: string;
  identification?: UpdateUserOptionsIdentification;
  address?: string;
  note?: string;
  nationality?: string;
  file?: any; // Consider using a more specific type
  payment?: UpdateUserOptionsPayment; // Consider using a more specific type
}

export class UpdateUser extends Command {
  constructor(options: UpdateUserOptions & { [key: string]: any }) {
    const {
      id,
      email,
      phone,
      identification,
      address,
      note,
      nationality,
      file,
      payment,
      ...rest
    } = options;
    if (!id) throw new RequestError("id is required");
    super({
      id,
      email,
      phone,
      identification,
      address,
      note,
      nationality,
      file,
      payment,
      ...rest,
    });
  }

  get name() {
    return "UpdateUser";
  }
}

export default UpdateUser;
