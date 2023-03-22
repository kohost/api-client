// Create the User Model
const schemas = require("../utils/schema");
const schema = require("../schemas/user.json");
const paymentSchema = require("../schemas/payment.json");
const Kohost = require("./kohost");

const { nanoid } = require("nanoid/async");

schemas.add(paymentSchema);
schemas.add(schema);

const validator = schemas.compile(schema);

class User extends Kohost {
  constructor(data) {
    super(data);
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

module.exports = User;
