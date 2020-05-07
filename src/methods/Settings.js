const base = "/settings";

function getAll() {
  return this.http.get(`${base}`, {});
}

function get(settingId) {
  return this.http.get(`${base}/${settingId}`, {});
}

function save(settingId, body) {
  return this.http.post(`${base}/${settingId}`, body);
}

const Settings = { getAll, get, save };
export default Settings;
