const Event = require("./Event");
const AMQPClient = require("../AMQPClient");

class ApplicationInUseEvent extends Event {
  constructor(data = {}, context) {
    super(data, context);
  }

  static get name() {
    return "ApplicationInUse";
  }

  static get exchange() {
    return AMQPClient.exchanges.AppEvents.name;
  }
}

module.exports = ApplicationInUseEvent;
