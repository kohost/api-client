// Create the User Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type UserSchema } from "../schemas/user.json";
import { schema as paymentSchema } from "../schemas/payment.json";
import Entity from "./Entity";
import MediaFile from "./MediaFile";

import { nanoid } from "nanoid/async";

registerSchema(paymentSchema);
registerSchema(schema);

interface User extends UserSchema {}

class User extends Entity {
  constructor(user: UserSchema) {
    if (user.photo) user.photo = new MediaFile(user.photo);
    super(user);
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

  static async generatePassword(len: number = 16): Promise<string> {
    return await nanoid(len);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isSuperAdmin(): boolean {
    return this.roles.includes("SuperAdmin");
  }

  get isAdmin(): boolean {
    return this.roles.includes("Admin") || this.roles.includes("Administrator");
  }

  get isManager(): boolean {
    return this.roles.includes("Manager");
  }

  get isUser(): boolean {
    return this.roles.includes("User");
  }

  get isGuest(): boolean {
    return this.roles.includes("Guest");
  }

  get roles(): string[] {
    const roles = new Set<string>();
    if (this.permissions) {
      for (const permission of this.permissions) {
        roles.add(permission.role);
      }
    }
    return Array.from(roles);
  }
}

User.validator = compileSchema(schema);
User.schema = schema;
User.validProperties = Object.keys(schema.properties);

export default User;
