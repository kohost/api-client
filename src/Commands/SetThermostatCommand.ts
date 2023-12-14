import Command from "./Command";

interface SetpointOption {
  value: number;
  min?: number;
  max?: number;
}

interface SetThermostatCommandOptions {
  id: string;
  hvacMode?: "cool" | "heat" | "off" | "auto";
  fanMode?: "on" | "off" | "auto" | "low" | "medium" | "high";
  setpoints?: {
    heat?: SetpointOption;
    cool?: SetpointOption;
    auto?: SetpointOption;
  };
  scale?: "fahrenheit" | "celsius";
  [key: string]: any;
}

class SetThermostatCommand extends Command {
  constructor(options: SetThermostatCommandOptions) {
    super(options);
  }

  get name() {
    return "SetThermostat";
  }

  get routingKey() {
    return `thermostat.${this.data.id}.set`;
  }
}

export default SetThermostatCommand;
