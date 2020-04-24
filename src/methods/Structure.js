const base = "/structure";
const Structure = {};

function getRoomList() {
  return this.http.get(`${base}/roomList`, {});
}

function summary() {
  return this.http.get(`${base}/summary`, {});
}

function deviceCount() {
  return this.http.get(`${base}/deviceCount`, {});
}

Structure.getRoomList = getRoomList;
Structure.getSummary = summary;
Structure.getDeviceCount = deviceCount;

export default Structure;
