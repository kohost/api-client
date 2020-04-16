import generateFunctions from "../utils/generate";

export default generateFunctions("/structure");


const base = "/structure";
const Structure = generateFunctions(base);

function getRoomList() {
  return this.http.get(`${base}/roomList`, {});
}

Structure.getRoomList = getRoomList;
export default Structure;
