import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { timeSheetSchema } from "./../schemas/timeSheet";
import { Entity } from "./Entity";

registerSchema(timeSheetSchema);
const validator = createValidator(timeSheetSchema);

export type TimeSheetSchema = FromSchema<
  typeof timeSheetSchema,
  { references: [typeof definitionsSchema] }
>;

export class TimeSheet extends Entity<TimeSheetSchema> {
  static schema = timeSheetSchema;
  validator = validator;

  constructor(data: TimeSheetSchema) {
    if (data.day) {
      data.day = new Date(data.day);
    }

    if (data.timeEntries && Array.isArray(data.timeEntries)) {
      data.timeEntries = data.timeEntries.map((t) => {
        if (!t.id) t.id = TimeSheet.generateTimeEntryId();
        if (t.start) t.start = new Date(t.start);
        if (t.end) t.end = new Date(t.end);
        return t;
      });

      // sort by start time
      data.timeEntries.sort((a, b) => {
        if (a.start < b.start) return -1;
        if (a.start > b.start) return 1;
        return 0;
      });
    }
    super(data);
  }

  static generateTimeEntryId(len = 16) {
    return nanoid(len);
  }
}

console.log("TIMESHEET IS NOT IMPLEMENTED YET");

// class TimeSheet extends Entity {
//   /**
//    * @typedef {import("../schemas/TimeSheetSchema").TimeSheet} TimeSheetType
//    * Create a TimeSheet instance.
//    * @constructor
//    * @param {TimeSheetType} timesheet - The timesheet object of type TimeSheet.
//    */
//   constructor(timesheet) {
//     if (timesheet.day) {
//       timesheet.day = new Date(timesheet.day);
//     }

//     if (timesheet.timeEntries && Array.isArray(timesheet.timeEntries)) {
//       timesheet.timeEntries = timesheet.timeEntries.map((t) => {
//         if (!t.id) t.id = TimeSheet.generateTimeEntryId();
//         if (t.start) t.start = new Date(t.start);
//         if (t.end) t.end = new Date(t.end);
//         return t;
//       });

//       // sort by start time
//       timesheet.timeEntries.sort((a, b) => {
//         if (a.start < b.start) return -1;
//         if (a.start > b.start) return 1;
//         return 0;
//       });
//     }
//     super(timesheet);
//   }

//   static generateTimeEntryId(len = 16) {
//     return nanoid(len);
//   }
// }

// Object.defineProperty(TimeSheet.prototype, "schema", {
//   value: schema,
// });

// Object.defineProperty(TimeSheet.prototype, "validator", {
//   get: function () {
//     return validator;
//   },
// });

// Object.defineProperty(TimeSheet, "validProperties", {
//   value: Object.keys(schema.properties),
// });

// module.exports = TimeSheet;

export default TimeSheet;
