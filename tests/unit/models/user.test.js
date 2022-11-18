const User = require("../../../models/user");

const valid = {
  firstName: "Ian",
  lastName: "Rogers",
  active: true,
  type: "user",
  email: "a3@bc.com",
  phone: "+15555555555",
  roles: ["Guest"],
};

test("does not throw error if invalid name provided ", () => {
  const data = { ...valid };
  expect(() => new User(data)).not.toThrow();
});

test("allows email to be empty", () => {
  const data = { ...valid };
  delete data.email;
  expect(() => new User(data)).not.toThrow();
});

test("allows phone to be empty", () => {
  const data = { ...valid };
  delete data.phone;
  expect(() => new User(data)).not.toThrow();
});
