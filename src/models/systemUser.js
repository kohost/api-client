// Create the User Model
const schemas = require("../utils/schema");
const schema = require("../schemas/systemUser.json");
const Entity = require("./Entity").default;

schemas.add(schema);

const validator = schemas.compile(schema);

class SystemUser extends Entity {
  /**
   * @typedef {import("../schemas/SystemUserSchema").SystemUser} SystemUserType
   * Create a SystemUser instance.
   * @constructor
   * @param {SystemUserType} user - The user object of type SystemUser.
   */

  constructor(user) {
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
}

Object.defineProperty(SystemUser.prototype, "schema", {
  value: schema,
});

Object.defineProperty(SystemUser.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(SystemUser, "validProperties", {
  value: Object.keys(schema.properties),
});

Object.defineProperty(SystemUser.prototype, "fullName", {
  get: function () {
    return `${this.firstName} ${this.lastName}`;
  },
});

module.exports = SystemUser;
