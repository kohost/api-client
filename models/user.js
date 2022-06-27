// Create the User Model
const { createModel } = require("../utils/compiler");
const userSchema = require("../schemas/user.json");

// convert to e.164 phone number
function toE164() {
  if (this.phoneNumber.length === 10) {
    this.phoneNumber = "+1" + this.phoneNumber;
  }
  return this.phoneNumber;
}

const User = createModel({
  schema: userSchema,
  name: "User",
  methods: [],
});

module.exports = User;
