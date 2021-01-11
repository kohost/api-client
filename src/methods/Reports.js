import generateFunctions from "../utils/generate";

const base = "/reports";
const Reports = generateFunctions(base);

function getEnergyStats(data) {
  const url = `${base}/room/stats`;
  return this.http.get(url, { params: data });
}

function getTicketStats(data) {
  const url = `${base}/ticket/stats`;
  return this.http.get(url, { params: data });
}

Reports.getEnergyStats = getEnergyStats;
Reports.getTicketStats = getTicketStats;
export default Reports;
