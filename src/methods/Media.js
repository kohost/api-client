function getGenres(room, currentSource) {
  const url = `/rooms/${room}/media/sources/${currentSource}/browse/genres`;
  return this.http.get(url, {});
}

function getStations(room, currentSource) {
  const url = `/rooms/${room}/media/sources/${currentSource}/browse/stations`;
  return this.http.get(url, {});
}

export default {
  getGenres,
  getStations,
};
