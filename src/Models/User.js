// Create the User Model
const schemas = require("../utils/schema");
const schema = require("../schemas/user.json");
const paymentSchema = require("../schemas/payment.json");
const Kohost = require("./Kohost");
const MediaFile = require("./MediaFile");
const Reservation = require("./Reservation");

const { nanoid } = require("nanoid/async");

schemas.add(paymentSchema);
schemas.add(schema);

const validator = schemas.compile(schema);

class User extends Kohost {
  /**
   * @typedef {import("../schemas/UserSchema").User} UserType
   * Create a User instance.
   * @constructor
   * @param {UserType} user - The user object of type User.
   */
  constructor(user) {
    if (user.photo) user.photo = new MediaFile(user.photo);
    if (user.reservations)
      user.reservations = user.reservations.map((res) => new Reservation(res));
    super(user);
  }

  static validatePhone(phoneNumber) {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phoneNumber);
  }

  static validateEmail(email) {
    //eslint-disable-next-line no-useless-escape
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
  value: Object.keys(schema.properties),
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

module.exports = User;
