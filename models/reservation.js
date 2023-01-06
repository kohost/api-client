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
    return this.adultCount + this.childCount;
  }

  get hasPayment() {
    return this.paymentId?.length > 0;
  }

  get range() {
    const start = new Date(this.checkInDateTime);
    const end = new Date(this.checkOutDateTime);

    // output Dec 19-23 if same month and year
    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${start.toLocaleString("default", {
        month: "short",
      })} ${start.getDate()}-${end.getDate()}`;
    }

    // output Dec 19 - Jan 2 if different month and year
    return `${start.toLocaleString("default", {
      month: "short",
    })} ${start.getDate()} - ${end.toLocaleString("default", {
      month: "short",
    })} ${end.getDate()}`;
  }

  get checkInTime() {
    return new Date(this.checkInDateTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  get checkOutTime() {
    return new Date(this.checkOutDateTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  }
}

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
