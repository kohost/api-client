import generateFunctions from "../utils/generate";

const base = "/rooms";
const Room = generateFunctions(base);

Room.Scenes = {
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
Room.Media = {
  getAll: function (roomId) {
    const url = `${base}/${roomId}/media`;
    return this.get(url);
  },
  update: function (roomId, body) {
    const url = `${base}/${roomId}/media`;
    return this.put(url, body);
  },
  trigger: function (roomId, body) {
    const url = `${base}/${roomId}/media`;
    return this.post(url, body);
  },
};

Room.Security = {
  getAll: function (roomId) {
    const url = `${base}/${roomId}/security`;
    return this.get(url);
  },
  Locks: {
    getAll: function (roomId) {
      const url = `${base}/${roomId}/security/locks`;
      return this.get(url);
    },
    get: function (roomId, id) {
      const url = `${base}/${roomId}/security/locks/${id}`;
      return this.get(url);
    },
    update: function (roomId, id, body) {
      const url = `${base}/${roomId}/security/locks/${id}`;
      return this.put(url, body);
    },
    add: function (roomId, body) {
      const url = `${base}/${roomId}/security/locks`;
      return this.post(url, body);
    },
    delete: function (roomId, id) {
      const url = `${base}/${roomId}/security/locks/${id}`;
      return this.delete(url);
    },
    trigger: function (roomId, id) {
      const url = `${base}/${roomId}/security/locks/${id}`;
      return this.post(url, {});
    },
  },
  Cameras: {
    getAll: function (roomId) {
      const url = `${base}/${roomId}/security/cameras`;
      return this.get(url);
    },
    get: function (roomId, id) {
      const url = `${base}/${roomId}/security/cameras/${id}`;
      return this.get(url);
    },
    update: function (roomId, id, body) {
      const url = `${base}/${roomId}/security/cameras/${id}`;
      return this.put(url, body);
    },
    add: function (roomId, body) {
      const url = `${base}/${roomId}/security/cameras`;
      return this.post(url, body);
    },
    delete: function (roomId, id) {
      const url = `${base}/${roomId}/security/cameras/${id}`;
      return this.delete(url);
    },
  },
};

export default Room;
