const Events = require("../Events");

function eventFactory(eventName) {
  const AllEvents = Object.values(Events);
  const Event = AllEvents.find((E) => E.prototype.name === eventName);
  if (!Event) throw new Error("Invalid event name: " + eventName);
  return Event;
}

module.exports = eventFactory;
