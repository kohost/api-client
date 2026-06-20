export interface PolicyPermissionLike {
  entities: string[];
  effect: "Allow" | "Deny";
}

export interface PolicyLike {
  permissions: PolicyPermissionLike[];
}

const FEATURE_PREFIX = "feature:";

export function getAllowedResourceIds(
  policies: PolicyLike[],
  resource: string,
): string[] {
  const allowed: string[] = [];
  const denied: string[] = [];

  for (const policy of policies) {
    for (const permission of policy.permissions) {
      for (const entity of permission.entities) {
        if (!entity.startsWith(resource)) continue;

        const [, id, subsystem, deviceId] = entity.split(":");
        const hasFinerSegment = Boolean(subsystem) || Boolean(deviceId);

        if (permission.effect === "Allow") {
          allowed.push(id);
        } else if (!hasFinerSegment) {
          denied.push(id);
        }
      }
    }
  }

  return denied.length > 0
    ? allowed.filter((id) => !denied.includes(id))
    : allowed;
}

export function getAllowedDeviceTypes(
  policies: PolicyLike[],
  spaceId: string,
): string[] {
  const prefix = `space:${spaceId}:`;
  const exactMatch = `space:${spaceId}`;
  const matchesSpace = (res: string) =>
    res === exactMatch || res.startsWith(prefix) || res.startsWith("space:*");

  const allowed: string[] = [];
  const denied: string[] = [];

  for (const policy of policies) {
    for (const permission of policy.permissions) {
      for (const entity of permission.entities) {
        if (!matchesSpace(entity)) continue;

        const [, , deviceType] = entity.split(":");
        if (permission.effect === "Allow") {
          if (!deviceType) {
            if (!allowed.includes("*")) allowed.push("*");
          } else {
            allowed.push(deviceType);
          }
        } else {
          denied.push(deviceType);
        }
      }
    }
  }

  return allowed.filter((id) => !denied.includes(id));
}

export function getAllowedFeatures(policies: PolicyLike[]): string[] {
  const allowed: string[] = [];
  const denied: string[] = [];

  for (const policy of policies) {
    for (const permission of policy.permissions) {
      for (const entity of permission.entities) {
        if (!entity.startsWith(FEATURE_PREFIX)) continue;

        const key = entity.slice(FEATURE_PREFIX.length);
        if (!key) continue;

        if (permission.effect === "Allow") {
          if (!allowed.includes(key)) allowed.push(key);
        } else if (!denied.includes(key)) {
          denied.push(key);
        }
      }
    }
  }

  return allowed.filter((key) => !denied.includes(key));
}
