import generateFunctions from "../utils/generate";

let base = "/integrations";

const Integrations = generateFunctions(base);

function getTypes() {
  const url = `${base}/types`;
  return this.get(url);
}

function getRoomMap(roomMap) {
  const url = `${base}/roomMap`;
  return this.post(url,roomMap);
}

Integrations.getTypes = getTypes;
Integrations.getRoomMap = getRoomMap;

export default Integrations;
