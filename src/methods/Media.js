const base = "/media/sources";
const MediaSources = function generateFunctions() {
  return {
    getAll: function (room) {
      return this.get(`/rooms/${room}/media/sources`);
    },
    get: function (room,id) {
      return this.get(`/rooms/${room}/media/sources/${id}`);
    },
    add: function (room,body) {
      return this.post(`/rooms/${room}/media/sources`, body);
    },
  };
};

function getGenres(room, currentSource) {
  const url = `/rooms/${room}/media/sources/${currentSource}/browse/genres`;
  return this.http.get(url, {});
}

function getStations(room, currentSource) {
  const url = `/rooms/${room}/media/sources/${currentSource}/browse/stations`;
  return this.http.get(url, {});
}

MediaSources.getGenres = getGenres;
MediaSources.getStations = getStations;
export default MediaSources;
