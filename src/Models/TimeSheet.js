// Create the TimeSheet Model
const schemas = require("../utils/schema");
const schema = require("../schemas/timeSheet.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class TimeSheet extends Entity {
  /**
   * @typedef {import("../schemas/TimeSheetSchema").TimeSheet} TimeSheetType
   * Create a TimeSheet instance.
   * @constructor
   * @param {TimeSheetType} timesheet - The timesheet object of type TimeSheet.
   */
  constructor(timesheet) {
    super(timesheet);
  }
}

Object.defineProperty(TimeSheet.prototype, "schema", {
  value: schema,
});

Object.defineProperty(TimeSheet.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(TimeSheet, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = TimeSheet;
