// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validateMotionSensor as validate } from '../validators/motionSensor';

  export class MotionSensor extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.driver = data.driver;
            this.systemId = data.systemId;
            this.supportedNotifications = data.supportedNotifications;
            this.notification = data.notification;
            this.watts = data.watts;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(MotionSensor.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"motionSensor.json","title":"Motion Sensor","description":"Any smart motion sensor","type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"$ref":"definitions.json#/definitions/type"},"driver":{"$ref":"definitions.json#/definitions/driver"},"systemId":{"$ref":"definitions.json#/definitions/systemId"},"supportedNotifications":{"$ref":"definitions.json#/definitions/supportedNotifications"},"notification":{"$ref":"definitions.json#/definitions/notification"},"watts":{"$ref":"definitions.json#/definitions/watts"}},"additionalProperties":false,"required":["id","type","driver"]}
  });

  Object.defineProperty(MotionSensor.prototype, "validator", {
	get: function() { return validate; }
  });
