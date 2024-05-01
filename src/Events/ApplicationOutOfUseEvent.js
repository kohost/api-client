const Event = require("./Event");
const AMQPClient = require("../AMQPClient");

class ApplicationOutOfUseEvent extends Event {
  constructor(data = {}, context = {}) {
    super(data, context);
  }

  static get name() {
    return "ApplicationOutOfUse";
  }

  static get entity() {
    return "app";
  }

  static get exchange() {
    return AMQPClient.exchanges.AppEvents.name;
  }
}

module.exports = ApplicationOutOfUseEvent;
