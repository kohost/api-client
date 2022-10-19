// create the ACL model
const schemas = require("../utils/schema");
const schema = require("../schemas/acl.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class ACL extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(ACL.prototype, "schema", {
  value: schema,
});

Object.defineProperty(ACL.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(ACL, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = ACL;
