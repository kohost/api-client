// Create the User Model
const schemas = require("../utils/schema");
const schema = require("../schemas/user.json");
const Kohost = require("./kohost");

const { nanoid } = require("nanoid/async");

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
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
    3;
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

module.exports = User;
