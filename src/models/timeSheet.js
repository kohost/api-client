// Create the TimeSheet Model
const schemas = require("../utils/schema");
const schema = require("../schemas/timeSheet.json");
const Entity = require("./Entity").default;

const { nanoid } = require("nanoid");

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
    if (timesheet.day) {
      timesheet.day = new Date(timesheet.day);
    }

    if (timesheet.timeEntries && Array.isArray(timesheet.timeEntries)) {
      timesheet.timeEntries = timesheet.timeEntries.map((t) => {
        if (!t.id) t.id = TimeSheet.generateTimeEntryId();
        if (t.start) t.start = new Date(t.start);
        if (t.end) t.end = new Date(t.end);
        return t;
      });

      // sort by start time
      timesheet.timeEntries.sort((a, b) => {
        if (a.start < b.start) return -1;
        if (a.start > b.start) return 1;
        return 0;
      });
    }
    super(timesheet);
  }

  static generateTimeEntryId(len = 16) {
    return nanoid(len);
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
