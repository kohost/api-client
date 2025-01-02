// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validate } from '../validators/payment';

  export class Payment extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.enabled = data.enabled;
            this.storageData = data.storageData;
            this.maskedNumber = data.maskedNumber;
            this.issued = data.issued;
            this.expires = data.expires;
            this.systemId = data.systemId;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(Payment.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"payment.json","title":"Payment","type":"object","required":["type","maskedNumber","expires"],"properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"type":"string","enum":["amex","visa","masterCard","maestro","discover","diners","jcb","applePay","alipay","chinaUnionPay","vpay"]},"enabled":{"type":"boolean","default":true},"storageData":{"type":["string","null"]},"maskedNumber":{"string":"string"},"issued":{"type":["string","null"]},"expires":{"string":"string"},"systemId":{"$ref":"definitions.json#/definitions/systemId"}}}
  });

  Object.defineProperty(Payment.prototype, "validator", {
	get: function() { return validate; }
  });
