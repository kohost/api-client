const Models = require("./models");
const Errors = require("./errors");
const HttpClient = require("./http");
const defs = require("./defs");

const Kohost = {
  Models,
  Errors,
  defs,
  Client: HttpClient,
};

module.exports = Kohost;
