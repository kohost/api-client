export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "organization.json",
  title: "Organization",
  type: "object",
  description:
    "An organization is a group or entity that subscribes to Kohost software.",
  required: ["accountNumber", "name", "smsNumber"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "organization",
      enum: ["organization"],
    },
    accountNumber: {
      type: ["number", "null"],
      minimum: 10000,
    },
    name: {
      type: "string",
    },
    smsNumber: {
      type: "string",
    },
    properties: {
      type: "array",
      items: {
        type: "string",
      },
    },
    hostname: {
      type: ["string", "null"],
    },
    appManifest: {
      type: "object",

      properties: {
        name: {
          type: "string",
        },
        short_name: {
          type: "string",
        },
        scope: {
          type: "string",
        },
        start_url: {
          type: "string",
        },
        themeColor: {
          type: "string",
        },
        backgroundColor: {
          type: "string",
        },
        display: {
          type: "string",
          enum: ["fullscreen", "standalone", "minimal-ui", "browser"],
          default: "fullscreen",
        },
        orientation: {
          type: "string",
          enum: ["portrait", "landscape"],
          default: "portrait",
        },
        splash: {
          type: "object",
          properties: {
            src: {
              type: "string",
            },
            type: {
              type: "string",
            },
            sizes: {
              type: "string",
            },
          },
        },
        icons: {
          type: "array",
          items: {
            type: "object",
            properties: {
              src: {
                type: "string",
              },
              sizes: {
                type: "string",
              },
              type: {
                type: "string",
              },
            },
          },
        },
        logo: {
          type: "object",
          properties: {
            src: {
              type: "string",
            },
            type: {
              type: "string",
            },
            sizes: {
              type: "string",
            },
          },
        },
      },
      default: {
        name: "Kohost",
        short_name: "Kohost",
        start_url: "/",
        scope: "/",
        display: "fullscreen",
        orientation: "portrait",
        theme_color: "#1d1f22",
        background_color: "#1d1f22",
        icons: [
          {
            src: "https://images.kohost.io/cdn-cgi/imagedelivery/vcVX2aBwdFSYr66spcFKaA/9c85047f-ccba-4b1c-3070-5463fbe93b00/w=512",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        splash: {
          src: "https://images.kohost.io/cdn-cgi/imagedelivery/vcVX2aBwdFSYr66spcFKaA/034fb112-5326-4d37-373e-d1cc2a4d0400/w=1500",
          sizes: "1500x800",
          type: "image/jpg",
        },
        logo: {
          src: "https://images.kohost.io/cdn-cgi/imagedelivery/vcVX2aBwdFSYr66spcFKaA/1e54c54d-3bac-4745-f46f-c2f98036af00/h=75",
          sizes: "300x75",
          type: "image/png",
        },
      },
    },
    tickets: {
      type: "object",
      properties: {
        nextTicketNumber: {
          type: ["string", "integer"],
          default: 1,
        },
      },
    },
    credentials: {
      type: "object",
      additionalProperties: true,
    },
    createdAt: {
      $ref: "definitions.json#/definitions/createdAt",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
  },
};
