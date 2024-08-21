import * as Events from "../Events";

export function eventFactory(eventName: string) {
  const AllEvents = Object.values(Events);
  const Event = AllEvents.find((E) => E.name === eventName);
  if (!Event) throw new Error("Invalid event name: " + eventName);
  return Event;
}
