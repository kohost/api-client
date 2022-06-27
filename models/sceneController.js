// Create the SceneController Model
const { createIotModel } = require("../utils/iot");
const sceneControllerSchema = require("../schemas/sceneController.json");

const SceneController = createIotModel({
  schema: sceneControllerSchema,
  name: "SceneController",
  generateGenerics: false,
});

module.exports = SceneController;
