// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validatePolicy as validate } from '../validators';

  export class Policy extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.discriminator = data.discriminator;
            this.name = data.name;
            this.description = data.description;
            this.organizationId = data.organizationId;
            this.propertyId = data.propertyId;
            this.permissions = data.permissions;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(Policy.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"policy.json","title":"Policy","description":"A policy is a set of permissions that can be applied to a user to limit their access to resources.","type":"object","required":["name","type","organizationId","propertyId","permissions","discriminator"],"properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"type":"string","default":"policy","enum":["policy"]},"discriminator":{"type":"string","enum":["user"]},"name":{"type":"string","minLength":1},"description":{"type":"string"},"organizationId":{"type":"string"},"propertyId":{"type":"string"},"permissions":{"type":"array","items":{"type":"object","required":["entities","effect"],"properties":{"entities":{"type":"array","items":{"type":"string","pattern":"^[^:]+(:.+)+$"}},"effect":{"type":"string","enum":["Allow","Deny"]}}}}}}
  });

  Object.defineProperty(Policy.prototype, "validator", {
	get: function() { return validate; }
  });
