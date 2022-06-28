const { createModel, addSchema } = require("./compiler");
const deviceSchema = require("../schemas/definitions/device.json");

addSchema(deviceSchema);

function createGenericIotSetCommand(command, allowedSets) {
  return function createSetCommand(data) {
    const dataKeys = Object.keys(data);
    if (!data || dataKeys.length === 0) throw new Error("data cannot be empty");
    dataKeys.forEach((key) => {
      if (!allowedSets.includes(key)) throw new Error(`${key} is not allowed`);
    });
    return {
      commandType: command,
      data,
    };
  };
}

// remove spaces from string
function removeSpaces(string) {
  return string.replace(/\s/g, "");
}

// replace spaces with underscores
function replaceSpaces(string) {
  return string.replace(/\s/g, "_");
}

function createIotModel({
  schema,
  name,
  methods = [],
  statics = [],
  settableProps = [],
  generateGenerics = true,
}) {
  const modelName = removeSpaces(name);
  const commandName = `SET_${replaceSpaces(name).toUpperCase()}`;

  if (generateGenerics)
    statics.push(createGenericIotSetCommand(commandName, settableProps));

  const IoTModel = createModel({
    schema,
    name: modelName,
    methods,
    statics,
  });

  IoTModel.settableProperties = settableProps;
  return IoTModel;
}

module.exports = { createIotModel };
