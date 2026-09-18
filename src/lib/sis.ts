import type { SISDriver } from "./sisDrivers.js";

/** What DescribeSISSync reports for the request property's SIS System. */
export interface SISSyncState {
  systemId: string;
  driver: SISDriver;
  /** Last successful roster sync, or null when the roster has never synced. */
  syncedAt: string | null;
  /** True while a sync for this system and property is in progress. */
  running: boolean;
  people: number;
  households: number;
}

/** What SyncSISRoster returns once the roster has been written. */
export interface SISSyncResult {
  systemId: string;
  driver: SISDriver;
  syncedAt: string;
  people: number;
  households: number;
}

/**
 * Display grouping derived from a person's SIS roles, in priority order:
 * a Student is a student even when also listed as someone's contact, a
 * parent who also teaches is a parent, and only someone whose every role is
 * Staff is staff.
 */
export type SISBucket = "student" | "parentGuardian" | "otherContact" | "staff";

export const SIS_BUCKETS: readonly SISBucket[] = [
  "staff",
  "student",
  "parentGuardian",
  "otherContact",
];

export interface SISPerson {
  id: string;
  systemId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  roles: string[];
  bucket: SISBucket;
  /** The SIS's own label for the person's first non-Student role, or null. */
  relationship: string | null;
}

export type SISPeopleSort = "name" | "bucket";
export type SISSortDirection = "asc" | "desc";

/** Query string ListSISPeople reads; every key is optional. */
export interface SISPeopleQuery {
  page?: number;
  limit?: number;
  /** Case-insensitive substring of the full name, email or phone. */
  search?: string;
  /** Comma-separated buckets to keep; absent or empty keeps every bucket. */
  bucket?: string;
  sort?: SISPeopleSort;
  direction?: SISSortDirection;
  /** `none` narrows to people the SIS lists in no household. */
  household?: "none";
}

/** Query string ListSISHouseholds reads; every key is optional. */
export interface SISHouseholdsQuery {
  page?: number;
  limit?: number;
  /** Case-insensitive substring of the household name or any member's name, email or phone. */
  search?: string;
  /** Comma-separated buckets members must fall in; a household with none left drops out. */
  bucket?: string;
}

export interface SISPage {
  page: number;
  pages: number;
  /** Rows matching every filter, across all pages. */
  total: number;
}

/**
 * What ListSISPeople returns: one page of the roster, plus how fresh it is.
 * `counts` is by bucket under the search alone, so a bucket filter reads the
 * size of each choice before it is made.
 */
export interface SISPeople extends SISPage {
  systemId: string;
  driver: SISDriver;
  syncedAt: string | null;
  running: boolean;
  people: SISPerson[];
  counts: Record<SISBucket, number>;
}

export interface SISHouseholdMember {
  systemId: string;
  /** The synced person's id, or null when the SIS listed a member it never returned as a person. */
  personId: string | null;
  name: string;
  /** The relationship label the SIS recorded for this member of the household. */
  relationship: string | null;
  /** Derived from the synced person's roles; null when the member was not synced. */
  bucket: SISBucket | null;
  email: string | null;
  phone: string | null;
}

export interface SISHousehold {
  id: string;
  systemId: string;
  name: string;
  members: SISHouseholdMember[];
}

/** What ListSISHouseholds returns: one page of households by name. */
export interface SISHouseholds extends SISPage {
  systemId: string;
  driver: SISDriver;
  syncedAt: string | null;
  households: SISHousehold[];
}
