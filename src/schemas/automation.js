export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "automation.json",
  title: "Automation",
  description: "An automation is a collection of triggers and actions",
  type: "object",
  required: ["id", "type", "trigger", "actions"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
      description: "The friendly name of the automation",
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

    trigger: {
      type: "object",
      description: "The trigger that initiates the automation",
      required: ["discriminator", "schedule"],
      properties: {
        discriminator: {
          type: "string",
          enum: ["time"],
          description: "Type of trigger",
        },
        // Time-based trigger properties
        schedule: {
          type: "object",
          description: "Schedule for time-based triggers",
          required: ["days", "time", "timezone"],
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
              description: "Time of day to trigger the automation",
            },
            timeOffsetSeconds: {
              type: "integer",
              description: "Offset in seconds from the scheduled time",
              default: 0,
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
        },
      },
    },
    actions: {
      type: "array",
      description: "Actions to perform when the trigger conditions are met",
      items: {
        type: "object",
        required: ["deviceId", "roomId", "discriminator", "state"],
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
          duration: {
            type: "integer",
            description:
              "Duration in seconds to keep the device in the configured state",
            minimum: 0,
          },
          state: {
            type: "array",
            items: {
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
