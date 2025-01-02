// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validateWindowCovering as validate } from '../validators';

  export class WindowCovering extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.name = data.name;
            this.type = data.type;
            this.discriminator = data.discriminator;
            this.supportedNotifications = data.supportedNotifications;
            this.notification = data.notification;
            this.driver = data.driver;
            this.offline = data.offline;
            this.position = data.position;
            this.systemId = data.systemId;
            this.watts = data.watts;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(WindowCovering.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"windowCovering.json","title":"Window Covering","description":"Any smart window covering","type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"name":{"type":"string"},"type":{"$ref":"definitions.json#/definitions/type","default":"windowCovering"},"discriminator":{"type":"string","enum":["basic","variable"],"default":"variable"},"supportedNotifications":{"$ref":"definitions.json#/definitions/supportedNotifications"},"notification":{"$ref":"definitions.json#/definitions/notification"},"driver":{"$ref":"definitions.json#/definitions/driver"},"offline":{"type":"boolean"},"position":{"type":["number","null"],"minimum":0,"maximum":100},"systemId":{"$ref":"definitions.json#/definitions/systemId"},"watts":{"$ref":"definitions.json#/definitions/watts"}},"required":["id","type","position","driver"]}
  });

  Object.defineProperty(WindowCovering.prototype, "validator", {
	get: function() { return validate; }
  });
