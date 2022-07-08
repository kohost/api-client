const Models = require("./models");
const { toMongoose } = require("./utils/compiler");
// export all classes on the Models object
module.exports = {
  Models,
  toMongoose,
};
