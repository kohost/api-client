const schemas = require("../utils/schema");
const schema = require("../schemas/reservation.json");
const Kohost = require("./Kohost");

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

  range(tz) {
    const start = new Date(this.checkInDateTime);
    const end = new Date(this.checkOutDateTime);

    // output Dec 19 if same day in timezone

    if (
      start.getDate() === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${start.toLocaleString("default", {
        month: "short",
        timeZone: tz,
      })} ${start.toLocaleString("default", {
        timeZone: tz,
        day: "numeric",
      })}`;
    }
    // output Dec 19-23 if same month and year
    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${start.toLocaleString("default", {
        month: "short",
        timeZone: tz,
      })} ${start.toLocaleString("default", {
        timeZone: tz,
        day: "numeric",
      })}-${end.toLocaleString("default", {
        timeZone: tz,
        day: "numeric",
      })}`;
    }

    // output Dec 19 - Jan 2 if different month and year
    return `${start.toLocaleString("default", {
      month: "short",
      timeZone: tz,
    })} ${start.getDate()} - ${end.toLocaleString("default", {
      month: "short",
      timeZone: tz,
    })} ${end.getDate()}`;
  }

  checkInTime(tz) {
    return new Date(this.checkInDateTime).toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
      timeZone: tz,
    });
  }

  checkOutTime(tz) {
    return new Date(this.checkOutDateTime).toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
      timeZone: tz,
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
