export const SIS_DRIVERS = ["veracross", "one-roster"] as const;

export type SISDriver = (typeof SIS_DRIVERS)[number];

export function isSISDriver(
  driver: string | null | undefined,
): driver is SISDriver {
  return (
    typeof driver === "string" &&
    (SIS_DRIVERS as readonly string[]).includes(driver)
  );
}
