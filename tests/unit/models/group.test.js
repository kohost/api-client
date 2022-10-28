const Group = require("../../../models/group");

const valid = {
  name: "Test Group",
};

test("throws error if invalid name provided ", () => {
  const data = { ...valid };
  data.name = "";
  expect(() => new Group(data)).toThrow();
});

test("sets defaults based on hotelRoom type ", () => {
  const data = { ...valid, type: "hotelRoom" };
  const group = new Group(data);
  expect(group).toHaveProperty("type", "hotelRoom");
  expect(group).toHaveProperty("maximumOccupancy", 2);
  expect(group).toHaveProperty("housekeepingStatus", "dirty");
  expect(group).toHaveProperty("serviceStatus", "inService");
  expect(group).toHaveProperty("features");
});

test("only sets defaults based on hotelRoom type ", () => {
  const data = { ...valid, type: "classRoom" };
  const group = new Group(data);
  expect(group).not.toHaveProperty("type", "hotelRoom");
  expect(group).not.toHaveProperty("maximumOccupancy");
  expect(group).not.toHaveProperty("housekeepingStatus");
  expect(group).not.toHaveProperty("serviceStatus");
  expect(group).not.toHaveProperty("features");
});
