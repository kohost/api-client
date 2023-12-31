// Create the User Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type SystemUserSchema } from "../schemas/systemUser.json";
import Entity from "./Entity";

registerSchema(schema);

interface SystemUser extends SystemUserSchema {}

class SystemUser extends Entity {
  constructor(user: SystemUserSchema) {
    super(user);
  }

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

SystemUser.validator = compileSchema(schema);
SystemUser.schema = schema;
SystemUser.validProperties = Object.keys(schema.properties);

export default SystemUser;
