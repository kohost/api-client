import generateFunctions from "../utils/generate";
import {generateSceneFunctions, generateIntegrationFunctions} from "../utils/generate";

const base = "/hotel-rooms";

function getRooms(hotelRoomId) {
  const url = `${base}/${hotelRoomId}/rooms`;
  return this.get(url);
}

function addRoom(hotelRoomId, body) {
  const url = `${base}/${hotelRoomId}/rooms`;
  return this.post(url, body);
}

function deleteRooms(hotelRoomId, body) {
  const url = `${base}/${hotelRoomId}/rooms`;
  return this.delete(url, body);
}

const Room = {
  getAll: getRooms,
  add: addRoom,
  delete: deleteRooms,
};

function getGuests(hotelRoomId) {
  const url = `${base}/${hotelRoomId}/guests`;
  return this.get(url);
}

const Guest = {
  getAll: getGuests,
};

function getScenes(hotelRoomId) {
  const url = `${base}/${hotelRoomId}/scenes`;
  return this.get(url);
}



const HotelRoom = generateFunctions(base);

HotelRoom.Room = Room;
HotelRoom.Guest = Guest;
HotelRoom.Scenes = generateSceneFunctions();
HotelRoom.Integrations = generateIntegrationFunctions();


export default HotelRoom;
