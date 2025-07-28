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
      required: ["discriminator"],
      properties: {
        discriminator: {
          type: "string",
          enum: ["schedule", "event"],
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
        event: {
          type: "object",
          required: ["eventName", "eventProperties", "match"],
          properties: {
            eventName: {
              type: "string",
              description:
                "Name of the event that triggers the automation actions",
            },
            eventProperties: {
              type: "array",
              description:
                "Properties of the event that triggers the automation actions",
              items: {
                type: "object",
                required: ["property", "value", "operator"],
                properties: {
                  property: {
                    type: "string",
                    description: "Property of the event",
                  },
                  value: {
                    type: "string",
                    description: "Value of the property",
                  },
                  operator: {
                    type: "string",
                    description: "Operator of the property",
                    enum: ["==", "!=", ">", ">=", "<", "<="],
                  },
                },
              },
            },
            match: {
              type: "string",
              description:
                "Match criteria for the event to trigger the automation actions",
              enum: ["any", "all"],
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
        required: ["useCase", "useCaseParams"],
        properties: {
          useCase: {
            type: "string",
            description: "Name of the use case to call",
          },
          useCaseParams: {
            type: "object",
            description: "Parameters to pass to the use case",
            required: ["data"],
            properties: {
              data: {
                type: ["object", "array"],
                description: "Data to pass to the use case",
              },
            },
          },
        },
        minItems: 1,
      },
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
