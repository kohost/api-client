const Models = require("./models");
const Errors = require("./errors");
const HttpClient = require("./http");
const defs = require("./defs");
const getFormalDeviceType = require("./utils/getFormalDeviceType");
const getDeviceTypes = require("./utils/getDeviceTypes");

const Kohost = {
  Models,
  Errors,
  defs,
  Client: HttpClient,
  utils: {
    getFormalDeviceType,
    getDeviceTypes,
  },
};

module.exports = Kohost;
