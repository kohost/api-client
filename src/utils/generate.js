export default function generateFunctions(baseUrl) {
  return {
    getAll: function () {
      return this.get(baseUrl);
    },
    get: function (id) {
      const url = `${baseUrl}/${id}`;
      return this.get(url);
    },
    update: function (id, body) {
      const url = `${baseUrl}/${id}`;
      return this.put(url, body);
    },
    add: function (body) {
      return this.post(baseUrl, body);
    },
    delete: function (id) {
      const url = `${baseUrl}/${id}`;
      return this.delete(url);
    },
  };
}

export function generateDeviceFunctions(path) {
  const base = "/rooms";
  return {
    getAll: function (roomId) {
      const url = `${base}/${roomId}/${path}`;
      return this.get(url);
    },
    get: function (roomId, id) {
      const url = `${base}/${roomId}/${path}/${id}`;
      return this.get(url);
    },
    update: function (roomId, id, body) {
      const url = `${base}/${roomId}/${path}/${id}`;
      return this.put(url, body);
    },
    add: function (roomId, body) {
      const url = `${base}/${roomId}/${path}`;
      return this.post(url, body);
    },
    delete: function (roomId, id) {
      const url = `${base}/${roomId}/${path}/${id}`;
      return this.delete(url);
    },
  };
}

export function generateGroupDeviceFunctions(path) {
  const base = "/groups";
  return {
    getAll: function (groupId, roomId) {
      const url = `${base}/${groupId}/rooms/${roomId}/${path}`;
      return this.get(url);
    },
    get: function (groupId, roomId, id) {
      const url = `${base}/${groupId}/rooms/${roomId}/${path}/${id}`;
      return this.get(url);
    },
    update: function (groupId, roomId, id, body) {
      const url = `${base}/${groupId}/rooms/${roomId}/${path}/${id}`;
      return this.put(url, body);
    },
    add: function (groupId, roomId, body) {
      const url = `${base}/${groupId}/rooms/${roomId}/${path}`;
      return this.post(url, body);
    },
    delete: function (groupId, roomId, id) {
      const url = `${base}/${groupId}/rooms/${roomId}/${path}/${id}`;
      return this.delete(url);
    },
  };
}

export function generateGroupRoomFunctions() {
  const base = "/groups";
  return {
    getAll: function (groupId) {
      const url = `${base}/${groupId}/rooms`;
      return this.get(url);
    },
    get: function (groupId, roomId) {
      const url = `${base}/${groupId}/rooms/${roomId}`;
      return this.get(url);
    },
    update: function (groupId, roomId, body) {
      const url = `${base}/${groupId}/rooms/${roomId}`;
      return this.put(url, body);
    },
    add: function (groupId, body) {
      const url = `${base}/${groupId}/rooms`;
      return this.post(url, body);
    },
    delete: function (groupId, roomId) {
      const url = `${base}/${groupId}/rooms/${roomId}`;
      return this.delete(url);
    },
  };
}

export function generateSceneFunctions() {
  const base = "/hotel-rooms";
  return {
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
}

export function generateIntegrationFunctions() {
  const base = "/hotel-rooms";
  return {
    getAll: function (roomId) {
      const url = `${base}/${roomId}/integrations`;
      return this.get(url);
    },
    get: function (roomId, id) {
      const url = `${base}/${roomId}/integrations/${id}`;
      return this.get(url);
    },
    update: function (roomId, id, body) {
      const url = `${base}/${roomId}/integrations/${id}`;
      return this.put(url, body);
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
}
