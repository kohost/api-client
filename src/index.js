const Models = require("./models");
const Errors = require("./errors");
const Commands = require("./commands");
const Events = require("./events");
const HttpClient = require("./http");
const defs = require("./defs");
const getFormalDeviceType = require("./utils/getFormalDeviceType");
const getDeviceTypes = require("./utils/getDeviceTypes");

const Kohost = {
  Models,
  Errors,
  Commands,
  Events,
  defs,
  Client: HttpClient,
  utils: {
    getFormalDeviceType: getFormalDeviceType,
    getDeviceTypes: getDeviceTypes,
  },
};

module.exports = Kohost;
