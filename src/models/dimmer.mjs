// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validate } from '../validators/dimmer';

  export class Dimmer extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.name = data.name;
            this.type = data.type;
            this.supportedNotifications = data.supportedNotifications;
            this.notification = data.notification;
            this.driver = data.driver;
            this.offline = data.offline;
            this.level = data.level;
            this.systemId = data.systemId;
            this.watts = data.watts;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(Dimmer.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"dimmer.json","title":"Dimmer","description":"Any smart dimmer","type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"name":{"type":"string"},"type":{"$ref":"definitions.json#/definitions/type"},"supportedNotifications":{"$ref":"definitions.json#/definitions/supportedNotifications"},"notification":{"$ref":"definitions.json#/definitions/notification"},"driver":{"$ref":"definitions.json#/definitions/driver"},"offline":{"type":"boolean"},"level":{"type":["number","null"],"minimum":0,"maximum":100},"systemId":{"$ref":"definitions.json#/definitions/systemId"},"watts":{"$ref":"definitions.json#/definitions/watts"}},"required":["id","type","level","driver"]}
  });

  Object.defineProperty(Dimmer.prototype, "validator", {
	get: function() { return validate; }
  });
