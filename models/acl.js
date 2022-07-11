// create the ACL model
const aclSchema = require("../schemas/acl.json");
const { createModel } = require("../utils/compiler");

const ACL = createModel({ schema: aclSchema, name: "ACL" });

module.exports = ACL;
