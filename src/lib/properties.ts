/**
 * The Archived Property rules the API and the app must apply identically
 * (ADR 0048): the platform never chooses an Archived Property on anyone's
 * behalf, and the app never offers one, so both read "archived" the same way.
 */

import type { PropertySchema } from "../schemas/property.js";

export type ArchivableProperty = Pick<PropertySchema, "archivedAt">;

export function isArchivedProperty(property: ArchivableProperty): boolean {
  return property.archivedAt != null;
}

/**
 * The Properties the system may choose, or an operator may pick, filter by or
 * count. Sites that look a Property up by id (history labels, permission
 * loading) must not use this.
 */
export function activeProperties<T extends ArchivableProperty>(
  properties: T[],
): T[] {
  return properties.filter((property) => !isArchivedProperty(property));
}

/** Stored as a BSON Date; every read model hands the app an ISO string. */
export function archivedAtIso(
  archivedAt: ArchivableProperty["archivedAt"],
): string | null {
  if (archivedAt == null) return null;
  return new Date(archivedAt).toISOString();
}

/** What `DescribePropertyArchiveImpact` returns and `ArchiveProperty` refuses on. */
export type ArchiveBlockerType =
  "ticket" | "serviceContract" | "server" | "sos";

/**
 * What archiving changes without refusing: sole-grant Users lose their view,
 * enabled Automations are disabled, and its Systems stop being heard.
 */
export type ArchiveWarningType =
  "soleGrantUser" | "enabledAutomation" | "system";

export interface ArchiveImpactItem<T extends string> {
  type: T;
  id: string;
  name?: string;
  /** A Ticket's number. */
  number?: string;
}

export interface PropertyArchiveImpact {
  blockers: ArchiveImpactItem<ArchiveBlockerType>[];
  warnings: ArchiveImpactItem<ArchiveWarningType>[];
}
