const schemas = require("../utils/schema");
const schema = require("../schemas/scene.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Scene extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Scene.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Scene.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Scene, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Scene;
