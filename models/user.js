// Create the User Model
const { createModel } = require("../utils/compiler");
const userSchema = require("../schemas/user.json");
const { nanoid } = require("nanoid/async");

// validate e.164 phone number
function validatePhone(phoneNumber) {
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(phoneNumber);
}

function validateEmail(email) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
  3;
}

// generate random password with nanoid
async function generatePassword(len = 16) {
  return await nanoid(len);
}

const User = createModel({
  schema: userSchema,
  name: "User",
  statics: [validatePhone, validateEmail, generatePassword],
});

Object.defineProperty(User.prototype, "fullName", {
  get: function () {
    return `${this.firstName} ${this.lastName}`;
  },
});

Object.defineProperty(User.prototype, "role", {
  get: function () {
    return this.type;
  },
});

module.exports = User;
