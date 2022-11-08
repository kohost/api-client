const Space = require("../../../models/space");

const valid = {
  name: "Test Space",
};

test("throws error if invalid name provided ", () => {
  const data = { ...valid };
  data.name = "";
  expect(() => new Space(data)).toThrow();
});

test("sets defaults based on hotelRoom type ", () => {
  const data = { ...valid, type: "hotelRoom" };
  const space = new Space(data);
  expect(space).toHaveProperty("type", "hotelRoom");
  expect(space).toHaveProperty("maximumOccupancy", 2);
  expect(space).toHaveProperty("housekeepingStatus", "dirty");
  expect(space).toHaveProperty("serviceStatus", "inService");
  expect(space).toHaveProperty("features");
});

test("only sets defaults based on hotelRoom type ", () => {
  const data = { ...valid, type: "classRoom" };
  const space = new Space(data);
  expect(space).not.toHaveProperty("type", "hotelRoom");
  expect(space).not.toHaveProperty("maximumOccupancy");
  expect(space).not.toHaveProperty("housekeepingStatus");
  expect(space).not.toHaveProperty("serviceStatus");
  expect(space).not.toHaveProperty("features");
});

test("will not set hotelRoom defaults without type ", () => {
  const data = { ...valid, type: "other" };
  const space = new Space(data);
  expect(space).not.toHaveProperty("type", "hotelRoom");
  expect(space).not.toHaveProperty("maximumOccupancy");
  expect(space).not.toHaveProperty("housekeepingStatus");
  expect(space).not.toHaveProperty("serviceStatus");
  expect(space).not.toHaveProperty("features");
});
