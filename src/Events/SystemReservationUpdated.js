import Event from "./Event";

class SystemReservationUpdate extends Event {
  constructor(reservation, context) {
    super(reservation, context);
  }

  static get name() {
    return "SystemReservationUpdated";
  }

  static get entity() {
    return "reservation";
  }
}

export default SystemReservationUpdate;
