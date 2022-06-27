// Create the SceneController Model
const { createModel } = require("../utils/compiler");
const sceneControllerSchema = require("../schemas/sceneController.json");

const SceneController = createModel({
  schema: sceneControllerSchema,
  name: "SceneController",
});

module.exports = SceneController;
