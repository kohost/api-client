import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { spaceSchema } from "./../schemas/space";
import { Entity } from "./Entity";

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
    super(data);
  }
}

//   /**
//    * @typedef {import("../schemas/SpaceSchema").Space} SpaceType
//    * Create a Space instance.
//    * @constructor
//    * @param {SpaceType} space - The space object of type Space.
//    */
//   constructor(space) {
//     const spaceData = mapSpaceData(space);
//     super(spaceData);
//   }

//   get floor() {
//     const floors = new Set();

//     this.room.forEach((room) => {
//       if (room.floor) floors.add(room.floor);
//     });

//     return floors.size == 1 ? [...floors][0] : undefined;
//   }

//   get hasDimmer() {
//     return this.rooms.some((room) => room.hasDimmer);
//   }

//   get hasSwitch() {
//     return this.rooms.some((room) => room.hasSwitch);
//   }

//   get hasWindowCovering() {
//     return this.rooms.some((room) => room.hasWindowCovering);
//   }

//   get hasThermostat() {
//     return this.rooms.some((room) => room.hasThermostat);
//   }

//   get hasLock() {
//     return this.rooms.some((room) => room.hasLock);
//   }

//   get hasCourtesy() {
//     return this.rooms.some((room) => room.hasCourtesy);
//   }

//   get hasCamera() {
//     return this.rooms.some((room) => room.hasCamera);
//   }

//   get hasAlarm() {
//     return this.rooms.some((room) => room.hasAlarm);
//   }

//   get hasMedia() {
//     return this.rooms.some((room) => room.hasMedia);
//   }
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

// function mapSpaceData(data) {
//   const spaceData = structuredClone(data);
//   if (spaceData.rooms?.length) {
//     spaceData.rooms.map((room) => {
//       if (typeof room === "string") return room;
//       if (room instanceof Room) return room;
//       return new Room(room);
//     });
//   }
//   return spaceData;
// }

// module.exports = Space;
