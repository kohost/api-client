import Event from "./Event";

interface ApplicationInUseEventOptions {
  propertyId: string;
  organizationId: string;
}

class ApplicationInUseEvent extends Event {
  constructor(
    options: ApplicationInUseEventOptions = {
      propertyId: "",
      organizationId: "",
    }
  ) {
    if (!options.propertyId)
      throw new Error("propertyId is required for ApplicationInUseEvent");
    super(options, options);
  }

  get name() {
    return "ApplicationInUse";
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `app.${this.context?.propertyId}.inUse`;
  }
}

export default ApplicationInUseEvent;
