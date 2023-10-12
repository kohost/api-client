const Command = require("./Command");

class SetThermostatCommand extends Command {
  constructor({ id, setpoints, hvacMode, fanMode, ...rest }) {
    super({ id, setpoints, hvacMode, fanMode, ...rest });
  }

  get name() {
    return "SetThermostat";
  }

  get routingKey() {
    return `thermostat.${this.data.id}.set`;
  }
}

module.exports = SetThermostatCommand;
