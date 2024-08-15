import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { spaceSchema } from "./../schemas/space";
import { Entity } from "./Entity";
import { Room } from "./Room";

registerSchema(spaceSchema);
const validator = createValidator(spaceSchema);

export type SpaceSchema = FromSchema<
  typeof spaceSchema,
  { references: [typeof definitionsSchema] }
>;

export class Space extends Entity<SpaceSchema> {
  static schema = spaceSchema;
  validator = validator;

  constructor(data: SpaceSchema) {
    super(mapSpaceData(data));
  }

  get hasDimmer(): boolean {
    return (
      this.rooms?.some((room: any) => room instanceof Room && room.hasDimmer) ||
      false
    );
  }

  get hasSwitch(): boolean {
    return (
      this.rooms?.some((room: any) => room instanceof Room && room.hasSwitch) ||
      false
    );
  }

  get hasWindowCovering(): boolean {
    return (
      this.rooms?.some(
        (room: any) => room instanceof Room && room.hasWindowCovering
      ) || false
    );
  }

  get hasThermostat(): boolean {
    return (
      this.rooms?.some(
        (room: any) => room instanceof Room && room.hasThermostat
      ) || false
    );
  }

  get hasLock(): boolean {
    return (
      this.rooms?.some((room: any) => room instanceof Room && room.hasLock) ||
      false
    );
  }

  get hasCourtesy(): boolean {
    return (
      this.rooms?.some(
        (room: any) => room instanceof Room && room.hasCourtesy
      ) || false
    );
  }

  get hasCamera(): boolean {
    return (
      this.rooms?.some((room: any) => room instanceof Room && room.hasCamera) ||
      false
    );
  }

  get hasAlarm(): boolean {
    return (
      this.rooms?.some((room: any) => room instanceof Room && room.hasAlarm) ||
      false
    );
  }

  get hasMedia(): boolean {
    return (
      this.rooms?.some((room: any) => room instanceof Room && room.hasMedia) ||
      false
    );
  }
}
// }

// Object.defineProperty(Space.prototype, "schema", {
//   value: schema,
// });

// Object.defineProperty(Space.prototype, "validator", {
//   get: function () {
//     return validator;
//   },
// });

// Object.defineProperty(Space, "validProperties", {
//   value: Object.keys(schema.properties),
// });

function mapSpaceData(data: SpaceSchema) {
  const spaceData = structuredClone(data);
  if (spaceData.rooms?.length) {
    spaceData.rooms.map((room: string | Room) => {
      if (typeof room === "string") return room;
      if (room instanceof Room) return room;
      return new Room(room);
    });
  }
  return spaceData;
}

// module.exports = Space;
