const Models = require("./Models");
const Errors = require("./Errors");
const Commands = require("./Commands");
const Events = require("./Events");
const defs = require("./defs");
const utils = require("./utils");
const Client = require("./Client");
const SocketIoClient = require("./SocketIoClient");
const AMQPClient = require("./AMQPClient");

class Kohost {
  static Models = Models;
  static Errors = Errors;
  static Commands = Commands;
  static Events = Events;
  static Client = Client;
  static SocketIoClient = SocketIoClient;
  static AMQPClient = AMQPClient;
  static defs = defs;
  static utils = utils;
}

module.exports = Kohost;
