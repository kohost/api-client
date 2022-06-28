// Create the User Model
const { createModel } = require("../utils/compiler");
const userSchema = require("../schemas/user.json");
const crypto = require("crypto");

// validate e.164 phone number
function validatePhone(phoneNumber) {
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(phoneNumber);
}

function validateEmail(email) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

// generate random password with crypto
function generatePassword(len = 16) {
  const password = crypto.randomBytes(len).toString("base64");
  return password;
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

const user = new User({
  id: "123",
  active: true,
  firstName: "John",
  lastName: "Doe",
  phone: "1234567890",
  email: "exmaple@dsd.com",
});

console.log(User.generatePassword());

user.email = "ian@itrogers.com";

console.log(user);

module.exports = User;
