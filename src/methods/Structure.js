import generateFunctions from "../utils/generate";

const base = "/structure";
const Structure = generateFunctions(base);

function getRoomList() {
  return this.http.get(`${base}/roomList`, {});
}

Structure.getRoomList = getRoomList;
export default Structure;
