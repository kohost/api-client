const schemas = require("../utils/schema");
const schema = require("../schemas/scene.json");
const Kohost = require("./kohost");
const SetSceneCommand = require("../Commands/SetSceneCommand");

schemas.add(schema);
const validator = schemas.compile(schema);

class Scene extends Kohost {
  constructor(data) {
    super(data);
  }

  static createSceneCommandPayload(room, scene) {
    const commandsByDriver = [];

    const sceneDevices = scene?.devices || {};
    const sceneId = scene.id;

    for (const deviceType in sceneDevices) {
      const sceneData = sceneDevices[deviceType];

      const roomDevices = room[deviceType];
      for (const data of sceneData) {
        const { id, ...deviceProps } = data;
        if (id === "*") {
          for (const device of roomDevices) {
            const driver = device.driver;
            const deviceCmd = {
              id: device.systemData?.id,
            };
            for (const prop in deviceProps) {
              if (prop === "setpointDelta") {
                const delta = deviceProps[prop];
                const currentMode = device.hvacMode;
                const setpoints = device.setpoints;
                const minAutoDelta = device.minAutoDelta;
                const currentSetpoint = setpoints[currentMode];

                if (currentMode === "heat") {
                  const setpointValue = Math.min(
                    currentSetpoint.min,
                    currentSetpoint.value - delta
                  );
                  deviceCmd.setpoints = {
                    heat: {
                      value: setpointValue,
                    },
                  };
                }
                if (currentMode === "cool") {
                  const setpointValue = Math.max(
                    currentSetpoint.max,
                    currentSetpoint.value + delta
                  );
                  deviceCmd.setpoints = {
                    cool: {
                      value: setpointValue,
                    },
                  };
                }

                if (currentMode === "auto") {
                  if (!currentSetpoint && setpoints.cool && setpoints.heat) {
                    const heatSetpoint = Math.min(
                      setpoints.heat.min,
                      setpoints.heat.value - delta
                    );

                    const coolSetpoint = Math.max(
                      setpoints.cool.max,
                      setpoints.cool.value + delta
                    );

                    // make sure the delta is not less than the minAutoDelta
                    if (Math.abs(heatSetpoint - coolSetpoint) < minAutoDelta) {
                      continue;
                    }

                    deviceCmd.setpoints = {
                      heat: {
                        value: heatSetpoint,
                      },
                      cool: {
                        value: coolSetpoint,
                      },
                    };
                  }
                }

                if (currentMode === "off") {
                  // move to next loop
                  continue;
                }
              } else {
                deviceCmd[prop] = deviceProps[prop];
              }
            }

            // move to next loop if the only key in deviceCmd is id
            if (Object.keys(deviceCmd).length === 1) {
              continue;
            }

            const driverIndex = commandsByDriver.findIndex(
              (c) => c.driver === driver
            );
            if (driverIndex >= 0) {
              commandsByDriver[driverIndex].command.devices.push(deviceCmd);
            } else {
              commandsByDriver.push({
                driver,
                command: {
                  id: sceneId,
                  devices: [deviceCmd],
                },
              });
            }
          }
        }
        /**
         * TODO: handle individual device ids
         */
      }
    }

    const commands = commandsByDriver.map((c) => {
      const command = new SetSceneCommand(c.command);
      return {
        driver: c.driver,
        command,
      };
    });

    return commands;
  }
}

Object.defineProperty(Scene.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Scene.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Scene, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Scene;
