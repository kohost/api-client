// create the Alarm Model
const mediaSourceSchema = require("../schemas/mediaSource.json");
const { createIotModel } = require("../utils/iot");

const MediaSource = createIotModel({
  schema: mediaSourceSchema,
  name: "Media Source",
  generateGenerics: false,
});

module.exports = MediaSource;
