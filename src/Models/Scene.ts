import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/scene.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type SceneSchema = import("../types/SceneSchema").SceneSchema;
type RoomSchema = import("../types/RoomSchema").RoomSchema;

class Scene extends Entity {
  constructor(scene: SceneSchema) {
    super(scene);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  static getRoomSceneDeviceData(
    room: RoomSchema,
    scene: SceneSchema,
    restore: boolean
  ) {
    const deviceData = [];

    const sceneDevices = scene?.devices || {};
    const sceneId = scene.id;

    for (const deviceType in sceneDevices) {
      const sceneData = sceneDevices[
        deviceType as keyof SceneSchema["devices"]
      ] as any;

      const roomDevices = room[deviceType as keyof RoomSchema] as any;

      if (sceneId === "1" && restore && deviceType !== "thermostats") continue;

      for (const data of sceneData) {
        const { id, ...deviceProps } = data;
        if (id === "*") {
          for (const device of roomDevices) {
            interface CommandData {
              [key: string]: any;
            }
            const deviceCmd = {
              id: device.id,
              systemId: device.systemId,
              type: device.type,
              driver: device.driver,
              commandData: {} as CommandData,
            };
            for (const prop in deviceProps) {
              if (prop === "setpointDelta") {
                const delta = deviceProps[prop];
                const currentMode = device.hvacMode;
                const setpoints = device.setpoints;
                const minAutoDelta = device.minAutoDelta;
                const currentSetpoint = setpoints[currentMode];

                if (currentMode === "heat") {
                  let setpointValue = Math.max(
                    currentSetpoint.min,
                    currentSetpoint.value - delta
                  );

                  if (restore) {
                    setpointValue = Math.min(
                      currentSetpoint.max,
                      currentSetpoint.value + delta
                    );
                  }

                  deviceCmd.commandData.setpoints = {
                    heat: {
                      value: setpointValue,
                    },
                  };
                }
                if (currentMode === "cool") {
                  let setpointValue = Math.min(
                    currentSetpoint.max,
                    currentSetpoint.value + delta
                  );

                  if (restore) {
                    setpointValue = Math.max(
                      currentSetpoint.min,
                      currentSetpoint.value - delta
                    );
                  }
                  deviceCmd.commandData.setpoints = {
                    cool: {
                      value: setpointValue,
                    },
                  };
                }

                if (currentMode === "auto") {
                  if (!currentSetpoint && setpoints.cool && setpoints.heat) {
                    let heatSetpoint = Math.max(
                      setpoints.heat.min,
                      setpoints.heat.value - delta
                    );

                    let coolSetpoint = Math.min(
                      setpoints.cool.max,
                      setpoints.cool.value + delta
                    );

                    if (restore) {
                      heatSetpoint = Math.min(
                        setpoints.heat.max,
                        setpoints.heat.value + delta
                      );

                      coolSetpoint = Math.max(
                        setpoints.cool.min,
                        setpoints.cool.value - delta
                      );
                    }

                    // make sure the delta is not less than the minAutoDelta
                    if (Math.abs(heatSetpoint - coolSetpoint) < minAutoDelta) {
                      continue;
                    }

                    deviceCmd.commandData.setpoints = {
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
                deviceCmd.commandData[prop] = deviceProps[prop];
              }
            }

            // move to next loop if no keys in command data
            if (Object.keys(deviceCmd.commandData).length === 0) {
              continue;
            }

            deviceData.push(deviceCmd);
          }
        }
        /**
         * TODO: handle individual device ids
         */
      }
    }
    return deviceData;
  }
}

export default Scene;
