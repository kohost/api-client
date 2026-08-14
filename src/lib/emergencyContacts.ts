import type { SISDriver } from "./sisDrivers.js";

export interface EmergencyContactRoleGroup {
  role: string;
  total: number;
  reachable: number;
}

export interface EmergencyContactAudience {
  driver: SISDriver;
  live: boolean;
  syncedAt: string | null;
  total: number;
  reachable: number;
  byRole: EmergencyContactRoleGroup[];
}
