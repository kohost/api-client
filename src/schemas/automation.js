export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "automation.json",
  title: "Automation",
  description: "An automation is a collection of triggers and actions",
  type: "object",
  required: ["id", "name", "type", "discriminator", "isEnabled"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
      description: "Name of the automation",
    },
    type: {
      type: "string",
      enum: ["automation"],
      default: "automation",
    },

    isEnabled: {
      type: "boolean",
      description: "Whether the automation is currently enabled",
      default: true,
    },
    description: {
      type: "string",
      description: "Optional description of what the automation does",
    },
    trigger: {
      type: "object",
      description: "The trigger that initiates the automation",
      required: ["type"],
      properties: {
        type: {
          type: "string",
          enum: [
            "time",
            "device",
            "motion",
            "temperature",
            "occupancy",
            "lock",
            "alarm",
          ],
          description: "Type of trigger",
        },
        // Time-based trigger properties
        schedule: {
          type: "object",
          description: "Schedule for time-based triggers",
          properties: {
            days: {
              type: "array",
              description: "Days of the week (0 = Sunday, 6 = Saturday)",
              items: {
                type: "integer",
                minimum: 0,
                maximum: 6,
              },
            },
            time: {
              type: "string",
              description: "Time in 24-hour format (HH:MM)",
              pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$",
            },
            repeat: {
              type: "boolean",
              description: "Whether the schedule repeats",
              default: true,
            },
            timezone: {
              type: "string",
              description: "Timezone for the schedule (IANA timezone format)",
            },
          },
          required: ["time"],
        },
        // Device-based trigger properties
        deviceId: {
          type: "string",
          description: "ID of the device that triggers the automation",
        },
        roomId: {
          type: "string",
          description: "ID of the room containing the triggering device",
        },
        condition: {
          type: "object",
          description: "Condition that must be met to trigger the automation",
          properties: {
            property: {
              type: "string",
              description:
                "Property to check (e.g., 'state', 'level', 'temperature')",
            },
            operator: {
              type: "string",
              enum: [
                "equals",
                "notEquals",
                "greaterThan",
                "lessThan",
                "greaterThanOrEqual",
                "lessThanOrEqual",
                "changes",
              ],
              description: "Comparison operator",
            },
            value: {
              type: ["string", "number", "boolean"],
              description: "Value to compare against",
            },
          },
          required: ["property", "operator"],
        },
      },
      allOf: [
        {
          if: {
            properties: { type: { enum: ["time"] } },
          },
          then: {
            required: ["schedule"],
          },
        },
        {
          if: {
            properties: {
              type: {
                enum: [
                  "device",
                  "motion",
                  "temperature",
                  "occupancy",
                  "lock",
                  "alarm",
                ],
              },
            },
          },
          then: {
            required: ["deviceId", "condition"],
          },
        },
      ],
    },
    actions: {
      type: "array",
      description: "Actions to perform when the trigger conditions are met",
      items: {
        type: "object",
        required: ["deviceId", "roomId", "action"],
        properties: {
          deviceId: {
            type: "string",
            description: "ID of the device to control",
          },
          roomId: {
            type: "string",
            description: "ID of the room containing the device",
          },
          discriminator: {
            type: "string",
            description:
              "Type discriminator for the device (e.g., 'windowCovering', 'switch')",
          },
          action: {
            type: "object",
            required: ["property", "value"],
            properties: {
              property: {
                type: "string",
                description:
                  "Property to set (e.g., 'state', 'level', 'setpoint')",
              },
              value: {
                type: ["string", "number", "boolean"],
                description: "Value to set the property to",
              },
              delay: {
                type: "integer",
                description: "Delay in seconds before executing this action",
                minimum: 0,
              },
            },
          },
        },
      },
      minItems: 1,
    },
    createdAt: {
      $ref: "definitions.json#/definitions/createdAt",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
    lastTriggeredAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the automation was last triggered",
    },
  },
  additionalProperties: false,
};

export const getters = {
  /**
   * Check if the automation is time-based
   * @returns {boolean} True if the automation is time-based
   */
  isTimeBased() {
    return (
      this.discriminator === "time" ||
      (this.trigger && this.trigger.type === "time")
    );
  },

  /**
   * Check if the automation is device-based
   * @returns {boolean} True if the automation is device-based
   */
  isDeviceBased() {
    return (
      this.discriminator === "device" ||
      (this.trigger && this.trigger.type !== "time")
    );
  },

  /**
   * Check if the automation is repeating (only applicable for time-based automations)
   * @returns {boolean} True if the automation repeats
   */
  isRepeating() {
    return this.isTimeBased() && this.trigger?.schedule?.repeat !== false;
  },
};
