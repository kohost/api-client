// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validateTimeSheet as validate } from '../validators';

  export class TimeSheet extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.userId = data.userId;
            this.day = data.day;
            this.locked = data.locked;
            this.timeEntries = data.timeEntries;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(TimeSheet.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"timeSheet.json","title":"Time Sheet","type":"object","required":["userId","day"],"properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"type":"string","default":"timeSheet","enum":["timeSheet"]},"userId":{"$ref":"definitions.json#/definitions/id"},"day":{"type":["string","object"],"format":"date-time"},"locked":{"type":"boolean","default":false,"description":"If true, the time sheet is locked and cannot be modified"},"timeEntries":{"type":"array","default":[],"items":{"type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"discriminator":{"type":"string","enum":["working","driving","meeting","break"]},"start":{"type":["string","object"],"format":"date-time"},"end":{"type":["string","object"],"format":"date-time"},"comment":{"type":"string"},"ticketId":{"type":"string"}},"required":["start","discriminator"],"additionalProperties":false}}}}
  });

  Object.defineProperty(TimeSheet.prototype, "validator", {
	get: function() { return validate; }
  });
