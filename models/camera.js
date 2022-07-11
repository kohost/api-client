// create the Alarm Model
const cameraSchema = require("../schemas/camera.json");
const { createIotModel } = require("../utils/iot");

const Camera = createIotModel({
  schema: cameraSchema,
  name: "Camera",
  generateGenerics: false,
});

module.exports = Camera;
