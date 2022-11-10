const Command = require("./Command");

class SetAlarmCommand extends Command {
  constructor({ id, zones, areas }) {
    super({ id, zones, areas });
  }

  get name() {
    return "SetAlarm";
  }

  get exchange() {
    return "Devices";
  }

  get routingKey() {
    return `alarm.${this.data.id}.set`;
  }
}

module.exports = SetAlarmCommand;
