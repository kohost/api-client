import Command from "./Command";

interface AlarmAreaOption {
  number: number;
  securityMode: "arm" | "disarm";
}

interface ZoneOption {
  number: number;
  bypassed: boolean;
}

interface SetAlarmBaseOptions {
  id: string;
  code?: string;
  [key: string]: any;
}

interface SetAlarmOptionsZonesOnly extends SetAlarmBaseOptions {
  zones: ZoneOption[];
  areas?: AlarmAreaOption[];
}

interface SetAlarmOptionsAreasOnly extends SetAlarmBaseOptions {
  zones?: ZoneOption[];
  areas: AlarmAreaOption[];
}

type SetAlarmCommandOptions =
  | SetAlarmOptionsZonesOnly
  | SetAlarmOptionsAreasOnly;

class SetAlarmCommand extends Command {
  constructor(options: SetAlarmCommandOptions) {
    super(options);
  }

  get name() {
    return "SetAlarm";
  }

  get routingKey() {
    return `alarm.${this.data.id}.set`;
  }
}

export default SetAlarmCommand;
