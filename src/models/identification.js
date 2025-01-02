// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validateIdentification as validate } from '../validators';

  export class Identification extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.number = data.number;
            this.maskedNumber = data.maskedNumber;
            this.encryptedNumber = data.encryptedNumber;
            this.issued = data.issued;
            this.expires = data.expires;
            this.verified = data.verified;
            this.matched = data.matched;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.issuingCountry = data.issuingCountry;
            this.systemId = data.systemId;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(Identification.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"identification.json","title":"Identification","type":"object","required":["type"],"oneOf":[{"required":["number"]},{"required":["encryptedNumber"]}],"properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"type":"string","enum":["driversLicense","passport","identityCard","visa"]},"number":{"string":"string"},"maskedNumber":{"string":"string"},"encryptedNumber":{"string":"string"},"issued":{"type":["string","object"],"format":"date-time"},"expires":{"type":["string","object","null"],"format":"date-time"},"verified":{"type":"boolean"},"matched":{"type":"boolean"},"firstName":{"type":"string"},"lastName":{"type":"string"},"issuingCountry":{"string":"string","minLength":2,"maxLength":2},"systemId":{"$ref":"definitions.json#/definitions/systemId"}}}
  });

  Object.defineProperty(Identification.prototype, "validator", {
	get: function() { return validate; }
  });
