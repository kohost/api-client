// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validateUser as validate } from '../validators';

  export class User extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.phone = data.phone;
            this.phoneVerified = data.phoneVerified;
            this.email = data.email;
            this.emailVerified = data.emailVerified;
            this.address = data.address;
            this.secretKey = data.secretKey;
            this.photo = data.photo;
            this.jobTitle = data.jobTitle;
            this.dob = data.dob;
            this.gender = data.gender;
            this.nationality = data.nationality;
            this.permissions = data.permissions;
            this.notes = data.notes;
            this.files = data.files;
            this.identifications = data.identifications;
            this.payments = data.payments;
            this.location = data.location;
            this.reservations = data.reservations;
            this.spaceName = data.spaceName;
            this.revenue = data.revenue;
            this.createdAt = data.createdAt;
            this.updatedAt = data.updatedAt;
            this.systems = data.systems;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(User.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"user.json","title":"User","type":"object","required":["firstName","lastName"],"properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"type":"string","default":"user"},"firstName":{"type":"string"},"lastName":{"type":"string"},"phone":{"type":["string","null"],"pattern":"^\\+[0-9]{1,14}$"},"phoneVerified":{"type":"boolean"},"email":{"type":["string","null"],"format":"email"},"emailVerified":{"type":"boolean"},"address":{"$ref":"definitions.json#/definitions/address"},"secretKey":{"type":"string"},"photo":{"$ref":"mediaFile.json#"},"jobTitle":{"type":"string"},"dob":{"type":"string"},"gender":{"type":"string","enum":["male","female"]},"nationality":{"type":"string","minLength":2,"maxLength":2},"permissions":{"type":"array","default":[],"items":{"type":"object","required":["organizationId","propertyId","role"],"properties":{"organizationId":{"type":"string","description":"The ID of the organization the permission is applies to."},"propertyId":{"type":"string","description":"The ID of the property the permission is applies to."},"role":{"type":"string","enum":["Guest","User","Manager","Maintenance","Administrator","SuperAdmin"]},"department":{"type":"string","description":"The department the user belongs to."},"policyIds":{"type":"array","items":{"type":"string","description":"ID of a policy that is applied to this role."}},"policies":{"type":"array","items":{"description":"A policy object populated from the policyIds array.","$ref":"policy.json"}}},"additionalProperties":false}},"notes":{"type":"array","items":{"type":"string"}},"files":{"type":"array","items":{"$ref":"mediaFile.json#"}},"identifications":{"type":"array","items":{"$ref":"identification.json#"}},"payments":{"type":"array","items":{"$ref":"payment.json#"}},"location":{"type":"object","required":["accuracy","latitude","longitude","timestamp"],"additionalProperties":false,"properties":{"accuracy":{"type":["number","null"]},"latitude":{"type":["number","null"]},"longitude":{"type":["number","null"]},"timestamp":{"type":["number","null"]}}},"reservations":{"type":"array","items":{"$ref":"reservation.json"}},"spaceName":{"type":"string"},"revenue":{"$ref":"definitions.json#/definitions/revenue"},"createdAt":{"$ref":"definitions.json#/definitions/createdAt"},"updatedAt":{"$ref":"definitions.json#/definitions/updatedAt"},"systems":{"type":"array","default":[],"items":{"type":"object","properties":{"systemId":{"type":"string"},"propertyId":{"type":"string"},"driver":{"type":"string"}},"required":["systemId","propertyId","driver"],"additionalProperties":false}}}}
  });

  Object.defineProperty(User.prototype, "validator", {
	get: function() { return validate; }
  });
