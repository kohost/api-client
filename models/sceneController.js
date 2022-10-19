// Create the SceneController Model
const schemas = require("../utils/schema");
const schema = require("../schemas/sceneController.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class SceneController extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(SceneController.prototype, "schema", {
  value: schema,
});

Object.defineProperty(SceneController.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(SceneController, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = SceneController;
