const Command = require("./Command");

class SetAlarmCommand extends Command {
  constructor({ id, zones, areas, code, ...rest }) {
    super({ id, zones, areas, code, ...rest });
  }

  get name() {
    return "SetAlarm";
  }

  get routingKey() {
    return `alarm.${this.data.id}.set`;
  }
}

module.exports = SetAlarmCommand;
