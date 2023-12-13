import Event from "./Event";

interface ApplicationOutOfUseEventOptions {
  propertyId: string;
  organizationId: string;
}

class ApplicationOutOfUseEvent extends Event {
  constructor(
    options: ApplicationOutOfUseEventOptions = {
      propertyId: "",
      organizationId: "",
    }
  ) {
    if (!options.propertyId)
      throw new Error("propertyId required for ApplicationOutOfUseEvent");
    super(options, options);
  }

  get name() {
    return "ApplicationOutOfUse";
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `app.${this.context?.propertyId}.outOfUse`;
  }
}

export default ApplicationOutOfUseEvent;
