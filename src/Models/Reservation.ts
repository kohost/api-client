import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { reservationSchema } from "./../schemas/reservation";
import { Entity } from "./Entity";

registerSchema(reservationSchema);
const validator = createValidator(reservationSchema);

export type ReservationSchema = FromSchema<
  typeof reservationSchema,
  { references: [typeof definitionsSchema] }
>;

export class Reservation extends Entity<ReservationSchema> {
  static schema = reservationSchema;
  validator = validator;

  constructor(data: ReservationSchema) {
    super(data);
  }
}
