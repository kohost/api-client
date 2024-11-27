// Create the Vendor Model
const schemas = require("../utils/schema");
const schema = require("../schemas/vendor.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Vendor extends Entity {
  /**
   * @typedef {import("../schemas/VendorSchema").Vendor} VendorType
   * Create a Product instance.
   * @constructor
   * @param {Vendor} vendor - The vendor object of type Vendor.
   */
  constructor(vendor) {
    super(vendor);
  }
}

Object.defineProperty(Vendor.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Vendor.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Vendor, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Vendor;
