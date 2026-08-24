export const SOS_AUDIENCES = ["internal", "external"] as const;

export type SOSAudience = (typeof SOS_AUDIENCES)[number];
