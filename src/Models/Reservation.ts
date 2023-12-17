import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/reservation.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type ReservationSchema = import("../types/ReservationSchema").ReservationSchema;

class Reservation extends Entity {
  constructor(reservation: ReservationSchema) {
    super(reservation);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  get peopleCount() {
    return this.adultCount + this.childCount;
  }

  get hasPayment() {
    return this.paymentId?.length > 0;
  }

  get nights() {
    const start = new Date(this.checkInDateTime).getTime();
    const end = new Date(this.checkOutDateTime).getTime();
    let nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
    if (nights <= 0) {
      nights = 1;
    }
    return nights;
  }

  range(tz: string) {
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

  checkInTime(tz: string) {
    return new Date(this.checkInDateTime).toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
      timeZone: tz,
    });
  }

  checkOutTime(tz: string) {
    return new Date(this.checkOutDateTime).toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
      timeZone: tz,
    });
  }
}

export default Reservation;
