const Command = require("./Command");

class SetThermostatCommand extends Command {
  constructor({ id, setpoints, hvacMode, fanMode }) {
    super({ id, setpoints, hvacMode, fanMode });
  }

  get name() {
    return "SetThermostat";
  }

  get routingKey() {
    return `thermostat.${this.data.id}.set`;
  }
}

module.exports = SetThermostatCommand;
