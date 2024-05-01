const Event = require("./Event");
const exchanges = require("../defs/amqpExchanges");

class ApplicationInUse extends Event {
  constructor(data = {}, context) {
    super(data, context);
  }

  static get name() {
    return "ApplicationInUse";
  }

  static get entity() {
    return "app";
  }

  static get exchange() {
    return exchanges.AppEvents.name;
  }
}

module.exports = ApplicationInUse;
