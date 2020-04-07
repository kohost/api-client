import generateFunctions from "../utils/generate";

const base = "/reports";
const Reports = generateFunctions(base);

function getStats(data) {
  const url = `${base}/room/stats`;
  return this.http.get(url, {params:data});
}

Reports.getStats = getStats;
export default Reports;
