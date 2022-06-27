// Create the Lock Model
const { createModel } = require("../utils/compiler");
const lockSchema = require("../schemas/lock.json");

const Lock = createModel({ schema: lockSchema, name: "Lock" });

module.exports = Lock;
