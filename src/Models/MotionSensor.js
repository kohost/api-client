// create the Motion Sensor Model
import schema, { properties } from "../schemas/motionSensor.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class MotionSensor extends Entity {
  /**
   * @typedef {import("../schemas/MotionSensorSchema").MotionSensor} MotionSensorType
   * Create a MotionSensor instance.
   * @constructor
   * @param {MotionSensorType} motionSensor - The motionSensor object of type MotionSensor.
   */
  constructor(motionSensor) {
    super(motionSensor);
  }
}

Object.defineProperty(MotionSensor.prototype, "schema", {
  value: schema,
});

Object.defineProperty(MotionSensor.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(MotionSensor, "validProperties", {
  value: Object.keys(properties),
});
