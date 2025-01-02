// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validate } from '../validators/alarm';

  export class Alarm extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.name = data.name;
            this.offline = data.offline;
            this.type = data.type;
            this.systemId = data.systemId;
            this.supportedNotifications = data.supportedNotifications;
            this.notification = data.notification;
            this.driver = data.driver;
            this.areas = data.areas;
            this.zones = data.zones;
            this.chime = data.chime;
            this.watts = data.watts;
            this.address = data.address;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(Alarm.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"alarm.json","title":"Alarm","description":"Any smart alarm system","type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"name":{"type":"string"},"offline":{"type":"boolean"},"type":{"$ref":"definitions.json#/definitions/type"},"systemId":{"$ref":"definitions.json#/definitions/systemId"},"supportedNotifications":{"$ref":"definitions.json#/definitions/supportedNotifications"},"notification":{"$ref":"definitions.json#/definitions/notification"},"driver":{"$ref":"definitions.json#/definitions/driver"},"areas":{"type":"array","items":{"type":"object","properties":{"number":{"type":"number"},"name":{"type":"string"},"securityMode":{"type":["string","null"],"enum":["arming","disarming","armed","disarmed","alarm",null]}},"additionalProperties":false}},"zones":{"type":"array","items":{"type":"object","properties":{"number":{"type":"number","minimum":0},"name":{"type":"string"},"secure":{"type":["boolean","null"]},"bypassed":{"type":["boolean","null"]}},"additionalProperties":false}},"chime":{"type":"boolean","description":"Reflects whether console chime is enabled"},"watts":{"$ref":"definitions.json#/definitions/watts"},"address":{"$ref":"definitions.json#/definitions/address"}},"required":["id","type","areas","zones","driver"]}
  });

  Object.defineProperty(Alarm.prototype, "validator", {
	get: function() { return validate; }
  });
