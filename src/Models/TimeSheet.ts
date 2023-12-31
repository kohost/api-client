// Create the TimeSheet Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type TimeSheetSchema } from "../schemas/timeSheet.json";
import Entity from "./Entity";
import { nanoid } from "nanoid";

registerSchema(schema);

interface TimeSheet extends TimeSheetSchema {}

class TimeSheet extends Entity {
  constructor(timesheet: TimeSheetSchema) {
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

  static generateTimeEntryId(len: number = 16): string {
    return nanoid(len);
  }
}

TimeSheet.validator = compileSchema(schema);
TimeSheet.schema = schema;
TimeSheet.validProperties = Object.keys(schema.properties);

export default TimeSheet;
