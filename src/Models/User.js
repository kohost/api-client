// Create the User Model
import paymentSchema from "../schemas/payment.json";
import schema, { properties } from "../schemas/user.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";
import { Identification } from "./Identification";
import { MediaFile } from "./MediaFile";
import { Policy } from "./Policy";
import { Reservation } from "./Reservation";

import { nanoid } from "nanoid/async";

add(paymentSchema);
add(schema);

const validator = compile(schema);

export class User extends Entity {
  /**
   * @typedef {import("../schemas/UserSchema").User} UserType
   * Create a User instance.
   * @constructor
   * @param {UserType} user - The user object of type User.
   */
  constructor(user) {
    if (user.photo) user.photo = new MediaFile(user.photo);
    if (user.reservations) {
      user.reservations = user.reservations.map((res) => new Reservation(res));
    }

    if (user.identifications) {
      user.identifications = user.identifications.map(
        (id) => new Identification(id),
      );
    }

    if (user.permissions) {
      user.permissions = user.permissions.map((permission) => {
        if (permission.policies && Array.isArray(permission.policies)) {
          permission.policies = permission.policies.map(
            (policy) => new Policy(policy),
          );
        }
        return permission;
      });
    }

    super(user);
  }

  static validatePhone(phoneNumber) {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phoneNumber);
  }

  static validateEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  static async generatePassword(len = 16) {
    return await nanoid(len);
  }
}

Object.defineProperty(User.prototype, "schema", {
  value: schema,
});

Object.defineProperty(User.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(User, "validProperties", {
  value: Object.keys(properties),
});

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
