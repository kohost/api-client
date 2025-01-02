// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validate } from '../validators/category';

  export class Category extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.name = data.name;
            this.driver = data.driver;
            this.description = data.description;
            this.image = data.image;
            this.rating = data.rating;
            this.discriminator = data.discriminator;
            this.systemId = data.systemId;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(Category.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"category.json","title":"Category","type":"object","required":["type","discriminator"],"properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"type":"string","default":"category"},"name":{"type":"string","minLength":1},"driver":{"$ref":"definitions.json#/definitions/driver"},"description":{"type":"string"},"image":{"$ref":"mediaFile.json"},"rating":{"type":"number","minimum":0,"maximum":10,"default":9},"discriminator":{"type":"string","enum":["space","product","mediaFile"]},"systemId":{"$ref":"definitions.json#/definitions/systemId"}}}
  });

  Object.defineProperty(Category.prototype, "validator", {
	get: function() { return validate; }
  });
