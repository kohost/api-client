import type { SISDriver } from "./sisDrivers.js";
import type { ExternalAudienceGroup } from "../schemas/definitions.js";

export interface EmergencyContactRoleGroup {
  role: string;
  total: number;
  reachable: number;
}

export interface ExternalGroupCounts {
  total: number;
  /** Contacts with a phone or an email. */
  reachable: number;
  /** Contacts with a phone, the SMS-only reach. */
  sms: number;
  /** Contacts with an email, the email-only reach. */
  email: number;
}

export interface EmergencyContactAudience {
  driver: SISDriver;
  live: boolean;
  syncedAt: string | null;
  total: number;
  reachable: number;
  byRole: EmergencyContactRoleGroup[];
  /** Counts for each selectable external group, whatever the send selected. */
  groups: Record<ExternalAudienceGroup, ExternalGroupCounts>;
}

export interface EmergencyContactPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  roles: string[];
  /** First non-student role, or null when the source system left it unmapped. */
  relationship: string | null;
  group: ExternalAudienceGroup;
  reachable: boolean;
  /** Per-channel opt-out state; a routine send skips the channels marked true. */
  optedOut?: { sms: boolean; email: boolean };
}

export interface EmergencyContactPeople {
  driver: SISDriver;
  live: boolean;
  syncedAt: string | null;
  /** The groups `people` was built for. */
  groups: ExternalAudienceGroup[];
  people: EmergencyContactPerson[];
}
