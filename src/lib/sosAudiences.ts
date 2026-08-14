export const SOS_AUDIENCES = ["internal", "emergencyContacts"] as const;

export type SOSAudience = (typeof SOS_AUDIENCES)[number];
