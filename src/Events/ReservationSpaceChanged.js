const Event = require("./Event");
const exchanges = require("../defs/amqpExchanges");

class ReservationSpaceChanged extends Event {
  constructor(reservation, context) {
    super(reservation, context);
  }

  static get name() {
    return "ReservationSpaceChanged";
  }

  static get entity() {
    return "reservation";
  }

  static get exchange() {
    return exchanges.AppEvents.name;
  }
}

module.exports = ReservationSpaceChanged;
