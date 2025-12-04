export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "server.json",
  title: "Server",
  description:
    "A server is a physical or virtual machine that runs the Kohost software",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["server"],
      default: "server",
    },
    networkInterfaces: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" }, // eth0, eno1, etc.
          mac: { type: "string" },
          ipv4: { type: "array", items: { type: "string" } },
          ipv6: { type: "array", items: { type: "string" } },
          state: { type: "string" }, // up, down
        },
      },
    },
    containers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" }, // container ID
          name: { type: "string" }, // container name
          image: { type: "string" }, // image:tag
          status: { type: "string" }, // running, exited, restarting
          state: { type: "string" }, // healthy, unhealthy, none
          restartCount: { type: "integer" },
          startedAt: { type: "string", format: "date-time" },
        },
      },
    },
    software: {
      type: "object",
      properties: {
        dockerVersion: { type: "string" },
        kernelVersion: { type: "string" },
        // other host-level software versions
      },
    },
    hostname: {
      type: "string",
    },
    organizationId: {
      type: "string",
    },
    propertyId: {
      type: "string",
    },
    manufacturer: {
      type: "string",
    },
    modelNumber: {
      type: "string",
    },
    serialNumber: {
      type: "string",
    },
    operatingSystem: {
      type: "string",
    },
    health: {
      type: "object",
      properties: {
        offline: {
          type: "boolean",
        },
        cpuUsage: {
          type: "number",
        },
        memoryUsage: {
          type: "number",
        },
        diskUsage: {
          type: "number",
        },
        lastHeartbeatAt: {
          type: "string",
          format: "date-time",
        },
      },
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
    virtualization: {
      type: "string",
    },
    bootedAt: {
      type: "string",
      format: "date-time",
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
    deletedAt: {
      type: "string",
      format: "date-time",
    },
    architecture: {
      type: "string",
    },
    resources: {
      type: "object",
      properties: {
        cpuCores: { type: "integer" },
        memoryTotal: { type: "integer" }, // bytes
        diskTotal: { type: "integer" }, // bytes
      },
    },
    timezone: {
      type: "string", // America/New_York, etc.
    },
  },
  required: ["id", "type"],
};
