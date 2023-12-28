// Create the User Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/systemUser.json";
import Entity from "./Entity";
import { SystemUserSchema } from "../types/SystemUserSchema";

add(schema);

const validator = compile(schema);

class SystemUser extends Entity {
  constructor(user: SystemUserSchema) {
    super(user);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static validatePhone(phoneNumber: string): boolean {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phoneNumber);
  }

  static validateEmail(email: string): boolean {
    //eslint-disable-next-line no-useless-escape
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
}

export default SystemUser;
