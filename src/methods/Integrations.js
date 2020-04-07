import generateFunctions from "../utils/generate";

let base = "/integrations";

const Integrations = generateFunctions(base);

function getTypes() {
  const url = `${base}/types`;
  return this.get(url);
}

Integrations.getTypes = getTypes;

export default Integrations;
