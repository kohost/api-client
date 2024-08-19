import { AlarmSchema } from "../Models/Alarm";
import { Command } from "./Command";

interface SetAlarmOptionsZone {
  number: number;
  bypassed: boolean;
}

interface SetAlarmOptionsArea {
  number: number;
  securityMode: AlarmSchema["areas"][0]["securityMode"];
}

export interface SetAlarmOptions {
  id: string;
  zones?: SetAlarmOptionsZone[];
  areas?: SetAlarmOptionsArea[];
  code?: string;
  chime?: boolean;
}

export class SetAlarm extends Command {
  constructor(options: SetAlarmOptions & { [key: string]: any }) {
    const { id, zones, areas, code, ...rest } = options;
    super({ id, zones, areas, code, ...rest });
  }

  get name() {
    return "SetAlarm";
  }
}

export default SetAlarm;
