
let base = "/integrations";

const Integrations = {
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
};

const types = {
  getAll: function () {
    return this.get(`${base}/types`);
  },
};

const deviceMap = {
  add: function (integrationId, data) {
    return this.post(`${base}/${integrationId}/deviceMap`, data);
  },
  delete: function (integrationId, data) {
    return this.delete(`${base}/${integrationId}/deviceMap`, data);
  },
};

const roomMap = {
  add: function (integrationId, data) {
    return this.post(`${base}/${integrationId}/roomMap`, data);
  },
  delete: function (integrationId, data) {
    return this.delete(`${base}/${integrationId}/roomMap`, data);
  },
};

const metadata = {
  update: function (integrationId, body) {
    const url = `${base}/${integrationId}/metaData`;
    return this.post(url, body);
  },
};

Integrations.Types = types;
Integrations.RoomMap = roomMap;
Integrations.Metadata = metadata;
Integrations.deviceMap = deviceMap;

export default Integrations;
