import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { identificationSchema } from "../schemas/identification";
import { mediaFileSchema } from "../schemas/mediaFile";
import { reservationSchema } from "../schemas/reservation";
import { createValidator, registerSchema } from "../utils/validation";
import { policySchema } from "./../schemas/policy";
import { userSchema } from "./../schemas/user";
import { Entity } from "./Entity";
import { Identification } from "./Identification";
import { MediaFile } from "./MediaFile";
import { Policy } from "./Policy";
import { Reservation } from "./Reservation";

registerSchema(userSchema);
const validator = createValidator(userSchema);

export type UserSchema = FromSchema<
  typeof userSchema,
  {
    references: [
      typeof definitionsSchema,
      typeof mediaFileSchema,
      typeof reservationSchema,
      typeof policySchema,
      typeof identificationSchema,
    ];
  }
>;

export class User extends Entity<UserSchema> {
  static schema = userSchema;
  validator = validator;

  constructor(user: UserSchema) {
    if (user.photo) user.photo = new MediaFile(user.photo);
    if (user.reservations && Array.isArray(user.reservations)) {
      user.reservations = user.reservations.map((res) => new Reservation(res));
    }

    if (user.identifications && Array.isArray(user.identifications)) {
      user.identifications = user.identifications.map(
        (id) => new Identification(id)
      );
    }

    if (user.permissions && Array.isArray(user.permissions)) {
      user.permissions = user.permissions.map((permission) => {
        if (permission.policies && Array.isArray(permission.policies)) {
          permission.policies = permission.policies.map(
            (policy) => new Policy(policy)
          );
        }
        return permission;
      });
    }
    super(user);
  }

  static validatePhone(phoneNumber: string) {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phoneNumber);
  }

  static validateEmail(email: string) {
    //eslint-disable-next-line no-useless-escape
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
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

  get isSuperAdmin() {
    return this.roles.includes("SuperAdmin");
  }

  get isAdmin() {
    return this.roles.includes("Admin") || this.roles.includes("Administrator");
  }

  get isManager() {
    return this.roles.includes("Manager");
  }

  get isUser() {
    return this.roles.includes("User");
  }

  get isGuest() {
    return this.roles.includes("Guest");
  }
}

export default User;
