import generateFunctions, {
  generateGroupRoomFunctions,
  generateGroupDeviceFunctions,
} from "../utils/generate";

const base = "/groups";
const Group = generateFunctions(base);

Group.Room = generateGroupRoomFunctions();
Group.Room.Light = generateGroupDeviceFunctions("lights");
Group.Room.Shade = generateGroupDeviceFunctions("shades");
Group.Room.Thermostat = generateGroupDeviceFunctions("thermostats");
Group.Room.Privacy = generateGroupDeviceFunctions("privacy");
Group.Room.Media = {
  get: function (groupId, roomId) {
    const url = `${base}/${groupId}/rooms/${roomId}/media`;
    return this.get(url);
  },
  update: function (groupId, roomId, body) {
    const url = `${base}/${groupId}/rooms/${roomId}/media`;
    return this.put(url, body);
  },
};
Group.Room.Security = {
  get: function (groupId, roomId) {
    const url = `${base}/${groupId}/rooms/${roomId}/security`;
    return this.get(url);
  },
  Locks: generateGroupDeviceFunctions("security/locks"),
  Cameras: generateGroupDeviceFunctions("security/cameras"),
};

export default Group;
