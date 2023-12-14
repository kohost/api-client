// Create the TimeSheet Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/timeSheet.json";
import Entity from "./Entity";

import { nanoid } from "nanoid";

type TimeSheetType = import("../types/TimeSheetSchema").TimeSheet;
// extend the type to include the id property

add(schema);
const validator = compile(schema);

class TimeSheet extends Entity {
  /**
   * @typedef {import("../schemas/TimeSheetSchema").TimeSheet} TimeSheetType
   * Create a TimeSheet instance.
   * @constructor
   * @param {TimeSheetType} timesheet - The timesheet object of type TimeSheet.
   */
  constructor(timesheet: TimeSheetType) {
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

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  static generateTimeEntryId(len = 16) {
    return nanoid(len);
  }
}

export default TimeSheet;
