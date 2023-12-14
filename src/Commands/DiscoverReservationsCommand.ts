import Command from "./Command";

interface DiscoverReservationsCommandOptions {
  id?: string | string[];
  checkInDateTime?: string | Date;
  checkOutDateTime?: string | Date;
  status?:
    | "reserved"
    | "checkedIn"
    | "checkedOut"
    | "cancelled"
    | "noShow"
    | "enquired"
    | "requested"
    | "optional";
  includeRevenue?: boolean;
  confirmationNumber?: string;
  [key: string]: any;
}

class DiscoverReservationsCommand extends Command {
  constructor(options: DiscoverReservationsCommandOptions) {
    super(options);
  }

  get name() {
    return "DiscoverReservations";
  }

  get routingKey() {
    return "reservation.discover";
  }
}

export default DiscoverReservationsCommand;
