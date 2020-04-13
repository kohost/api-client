import generateFunctions from "../utils/generate";

const base = "/settings";
const Settings = generateFunctions(base);

function getAppSettings() {
  return this.http.get(`${base}/application`, {});
}

Settings.getAppSettings = getAppSettings;
export default Settings;
