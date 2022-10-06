const { createModel } = require("../utils/compiler");
const sceneSchema = require("../schemas/scene.json");

const Scene = createModel({
  schema: sceneSchema,
  name: "Scene",
});

module.exports = Scene;
