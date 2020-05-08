import generateFunctions from "../utils/generate";

const Sources = generateFunctions("sources");

Sources.updatePlayer = function (sourceId) {
  return this.post(`sources/${sourceId}/player`, {});
};

export default Sources;
