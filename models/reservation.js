const schemas = require("../utils/schema");
const schema = require("../schemas/reservation.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Reservation extends Kohost {
  constructor(data) {
    super(data);
  }

  get peopleCount() {
    return this.adultCount + this.childCount
  };

  get hasPayment() {
    return this.paymentId?.length > 0;
  };

};

Object.defineProperty(Reservation.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Reservation.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Reservation, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Reservation;
