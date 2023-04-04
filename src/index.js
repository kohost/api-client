const Models = require("./Models");
const Errors = require("./Errors");
const Commands = require("./Commands");
const Events = require("./Events");
const defs = require("./defs");
const utils = require("./utils");
const Client = require("./Client");
const SocketIoClient = require("./SocketIoClient");

const Kohost = {
  Models,
  Errors,
  Commands,
  Events,
  Client,
  SocketIoClient,
  defs,
  utils: utils,
};

module.exports = Kohost;
