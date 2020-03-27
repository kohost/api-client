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
      const url = `${base}/${id}`;
      return this.put(url, body);
    },
    add: function (body) {
      return this.post(base, body);
    },
    delete: function (id) {
      const url = `${base}/${id}`;
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
