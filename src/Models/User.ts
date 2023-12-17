// Create the User Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/user.json";
import paymentSchema from "../schemas/payment.json";
import Entity from "./Entity";
import MediaFile from "./MediaFile";
import Reservation from "./Reservation";
import Identification from "./Identification";

import { nanoid } from "nanoid/async";

add(paymentSchema);
add(schema);

const validator = compile(schema);

type UserSchema = import("../types/UserSchema").UserSchema;

class User extends Entity {
  constructor(user: UserSchema) {
    if (user.photo) user.photo = new MediaFile(user.photo);
    if (user.reservations)
      user.reservations = user.reservations.map((res) => new Reservation(res));
    if (user.identifications)
      user.identifications = user.identifications.map(
        (id) => new Identification(id)
      );

    super(user);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

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
}

Object.defineProperty(User.prototype, "fullName", {
  get: function () {
    return `${this.firstName} ${this.lastName}`;
  },
});

Object.defineProperty(User.prototype, "roles", {
  get: function () {
    const roles = new Set();
    if (this.permissions) {
      for (const permission of this.permissions) {
        roles.add(permission.role);
      }
    }
    return Array.from(roles);
  },
});

Object.defineProperty(User.prototype, "isSuperAdmin", {
  get: function () {
    return this.roles.includes("SuperAdmin");
  },
});

Object.defineProperty(User.prototype, "isAdmin", {
  get: function () {
    return this.roles.includes("Admin") || this.roles.includes("Administrator");
  },
});

Object.defineProperty(User.prototype, "isManager", {
  get: function () {
    return this.roles.includes("Manager");
  },
});

Object.defineProperty(User.prototype, "isUser", {
  get: function () {
    return this.roles.includes("User");
  },
});

Object.defineProperty(User.prototype, "isGuest", {
  get: function () {
    return this.roles.includes("Guest");
  },
});

export default User;
