// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validate } from '../validators/mediaFile';

  export class MediaFile extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.name = data.name;
            this.fileHash = data.fileHash;
            this.category = data.category;
            this.mimeType = data.mimeType;
            this.data = data.data;
            this.url = data.url;
            this.width = data.width;
            this.height = data.height;
            this.size = data.size;
            this.uploadUrl = data.uploadUrl;
            this.uploadUrlExpires = data.uploadUrlExpires;
            this.createdBy = data.createdBy;
            this.systemId = data.systemId;
	}
	  

	
	  
	  createImageVariant(params) {
  if (this.mimeType != "image/*")
    throw new Error("Only dynamic images can have variants");
  if (!this.url) throw new Error("MediaFile has no url");
  // convert params to "key=value" pairs
  const query = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join(",");

  // replace the final /public with the query above
  return this.url.replace(/\/public$/, `/${query}`);
}

	  

	  
  }

  Object.defineProperty(MediaFile.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"mediaFile.json","title":"Media File","description":"Any media file","type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"type":"string","default":"mediaFile","enum":["mediaFile"]},"name":{"type":"string"},"fileHash":{"type":"string"},"category":{"type":"string","description":"This is the category id"},"mimeType":{"type":"string","enum":["image/*","image/jpeg","image/png","image/gif","image/webp","image/avif","image/svg+xml","application/pdf"]},"data":{"type":"string"},"url":{"type":"string","format":"uri"},"width":{"type":"integer","minimum":0},"height":{"type":"integer","minimum":0},"size":{"type":"integer","minimum":0,"description":"Size in bytes"},"uploadUrl":{"type":"string","format":"uri"},"uploadUrlExpires":{"$ref":"definitions.json#/definitions/date"},"createdBy":{"type":"string"},"systemId":{"$ref":"definitions.json#/definitions/systemId"}},"additionalProperties":false,"required":["type"]}
  });

  Object.defineProperty(MediaFile.prototype, "validator", {
	get: function() { return validate; }
  });
