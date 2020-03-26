const base = "/hotel-rooms";

function getAllHotelRooms() {
  return this.get(base);
}

function getHotelRoom(id) {
  const url = `${base}/${id}`;
  return this.get(url);
}

function updateHotelRoom(id, body) {
  const url = `${base}/${id}`;
  return this.put(url, body);
}

function addHotelRoom(body) {
  return this.post(base, body);
}

function deleteHotelRoom(id, body = {}) {
  const url = `${base}/${id}`;
  return this.delete(url, body);
}

const HotelRoom = {
  getAll: getAllHotelRooms,
  get: getHotelRoom,
  update: updateHotelRoom,
  add: addHotelRoom,
  delete: deleteHotelRoom
};

export default HotelRoom;
