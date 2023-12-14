import Command from "./Command";

interface UpdateReservationCommandOptions {
  id: string;
  space?: string;
  spaceCategory?: string;
  checkInDateTime?: string | Date;
  checkOutDateTime?: string | Date;
  [key: string]: any;
}

/**
 * Update a reservation
 */
class UpdateReservationCommand extends Command {
  constructor(options: UpdateReservationCommandOptions) {
    super(options);
  }

  get name() {
    return "UpdateReservation";
  }

  get routingKey() {
    return `reservation.${this.data.id}.update`;
  }
}

export default UpdateReservationCommand;
