import Events from "../Events";

function eventFactory(eventName: string) {
  const AllEvents = Object.values(Events);
  const Event = AllEvents.find((E) => E.prototype.name === eventName);
  if (!Event) throw new Error("Invalid event name: " + eventName);
  return Event;
}

export default eventFactory;
