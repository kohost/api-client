import generateFunctions from "../utils/generate";

const base = "/hotel-rooms";
const HotelRoom = generateFunctions(base);

HotelRoom.Room = {
  getAll: function getRooms(hotelRoomId) {
    const url = `${base}/${hotelRoomId}/rooms`;
    return this.get(url);
  },
  add: function addRoom(hotelRoomId, rooms) {
    const url = `${base}/${hotelRoomId}/rooms`;
    return this.post(url, { rooms });
  },
  delete: function deleteRooms(hotelRoomId, body) {
    const url = `${base}/${hotelRoomId}/rooms`;
    return this.delete(url, body);
  },
};
HotelRoom.Guest = {
  getAll: function getGuests(hotelRoomId) {
    const url = `${base}/${hotelRoomId}/guests`;
    return this.get(url);
  },
};

HotelRoom.Scenes = {
  getAll: function (roomId) {
    const url = `${base}/${roomId}/scenes`;
    return this.get(url);
  },
  get: function (roomId, id) {
    const url = `${base}/${roomId}/scenes/${id}`;
    return this.get(url);
  },
  trigger: function (roomId, id) {
    const url = `${base}/${roomId}/scenes/${id}/trigger`;
    return this.post(url, {});
  },
  update: function (roomId, id, body) {
    const url = `${base}/${roomId}/scenes/${id}`;
    return this.put(url, body);
  },
  add: function (roomId, body) {
    const url = `${base}/${roomId}/scenes`;
    return this.post(url, body);
  },
  delete: function (roomId, id) {
    const url = `${base}/${roomId}/scenes/${id}`;
    return this.delete(url);
  },
};

HotelRoom.Integrations = {
  getAll: function (roomId) {
    const url = `${base}/${roomId}/integrations`;
    return this.get(url);
  },
  add: function (roomId, body) {
    const url = `${base}/${roomId}/integrations`;
    return this.post(url, body);
  },
  delete: function (roomId, id) {
    const url = `${base}/${roomId}/integrations/${id}`;
    return this.delete(url);
  },
};

HotelRoom.Alarms = {
  getAll: function (roomId) {
    const url = `${base}/${roomId}/alarms`;
    return this.get(url);
  },
  get: function (roomId, id) {
    const url = `${base}/${roomId}/alarms/${id}`;
    return this.get(url);
  },
  add: function (roomId, body) {
    const url = `${base}/${roomId}/alarms`;
    return this.post(url, body);
  },
  delete: function (roomId, id) {
    const url = `${base}/${roomId}/alarms/${id}`;
    return this.delete(url);
  },
};

export default HotelRoom;
