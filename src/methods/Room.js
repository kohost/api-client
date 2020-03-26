const base = "/rooms";

function getAllRooms() {
  return this.get(base);
}

function getRoom(id) {
  const url = `${base}/${id}`;
  return this.get(url);
}

function updateRoom(id, body) {
  const url = `${base}/${id}`;
  return this.put(url, body);
}

function addRoom(body) {
  return this.post(base, body);
}

function deleteRoom(id, body = {}) {
  const url = `${base}/${id}`;
  return this.delete(url, body);
}

const Room = {
  getAll: getAllRooms,
  get: getRoom,
  update: updateRoom,
  add: addRoom,
  delete: deleteRoom
};

export default Room;
