// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validateTicket as validate } from '../validators';

  export class Ticket extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.number = data.number;
            this.issueId = data.issueId;
            this.conversation = data.conversation;
            this.openedBy = data.openedBy;
            this.requester = data.requester;
            this.assignedTo = data.assignedTo;
            this.status = data.status;
            this.priority = data.priority;
            this.tags = data.tags;
            this.department = data.department;
            this.rating = data.rating;
            this.ratingComment = data.ratingComment;
            this.tipAmount = data.tipAmount;
            this.autoCloseAt = data.autoCloseAt;
            this.scheduleDate = data.scheduleDate;
            this.createdAt = data.createdAt;
            this.updatedAt = data.updatedAt;
            this.solvedAt = data.solvedAt;
            this.closedAt = data.closedAt;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(Ticket.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"ticket.json","title":"Ticket","description":"A ticket is a request from a user.","type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"type":"string","enum":["ticket"],"default":"ticket"},"number":{"type":"string"},"issueId":{"type":"string"},"conversation":{"type":"array","default":[],"items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string"},"userId":{"type":"string"},"userName":{"type":"string"},"vendorId":{"type":"string"},"vendorName":{"type":"string"},"systemId":{"type":"string"},"systemName":{"type":"string"},"timestamp":{"$ref":"definitions.json#/definitions/createdAt"},"body":{"type":"string"},"readBy":{"type":"array","default":[],"items":{"type":"string"}},"media":{"anyOf":[{"$ref":"mediaFile.json"},{"type":"null"}]}},"anyOf":[{"required":["id","userId","timestamp","body"]},{"required":["id","systemId","timestamp","body"]},{"required":["id","vendorId","timestamp","body"]}]}},"openedBy":{"type":"object","properties":{"userId":{"type":"string"},"systemId":{"type":"string"}}},"requester":{"type":"object","properties":{"systemId":{"type":"string"},"systemName":{"type":"string"},"systemPhoto":{"anyOf":[{"$ref":"mediaFile.json"},{"type":"null"},{"type":"string"}]},"userId":{"type":"string"},"userName":{"type":"string"},"userPhoto":{"anyOf":[{"$ref":"mediaFile.json"},{"type":"null"},{"type":"string"}]},"deviceId":{"type":"string"},"roomId":{"type":"string"},"reservationId":{"type":"string"},"spaceId":{"type":"string"},"spaceName":{"type":"string"}}},"assignedTo":{"type":"object","properties":{"userId":{"type":"string"},"userName":{"type":"string"},"userPhoto":{"anyOf":[{"$ref":"mediaFile.json"},{"type":"null"},{"type":"string"}]},"vendorId":{"type":"string"},"vendorName":{"type":"string"},"vendorPhoto":{"anyOf":[{"$ref":"mediaFile.json"},{"type":"null"},{"type":"string"}]}}},"status":{"type":"string","enum":["open","pending","solved","closed"],"default":"open"},"priority":{"type":"string","enum":["low","normal","high"],"default":"normal"},"tags":{"type":"array","default":[],"items":{"type":"string"}},"department":{"type":"string"},"rating":{"type":"number","minimum":0,"maximum":5},"ratingComment":{"type":"string"},"tipAmount":{"type":"string"},"autoCloseAt":{"$ref":"definitions.json#/definitions/date"},"scheduleDate":{"$ref":"definitions.json#/definitions/date"},"createdAt":{"$ref":"definitions.json#/definitions/date"},"updatedAt":{"$ref":"definitions.json#/definitions/date"},"solvedAt":{"$ref":"definitions.json#/definitions/date"},"closedAt":{"$ref":"definitions.json#/definitions/date"}},"required":["id","conversation","requester","status","tags","createdAt","updatedAt"],"additionalProperties":false}
  });

  Object.defineProperty(Ticket.prototype, "validator", {
	get: function() { return validate; }
  });
