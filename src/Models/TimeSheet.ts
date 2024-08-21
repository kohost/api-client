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
    if (data.timeEntries && Array.isArray(data.timeEntries)) {
      // sort by start time
      data.timeEntries.sort((a, b) => {
        const aStart = new Date(a.start).getTime();
        const bStart = new Date(b.start).getTime();
        if (aStart < bStart) return -1;
        if (aStart > bStart) return 1;
        return 0;
      });
    }
    super(data);
  }
}

export default TimeSheet;
