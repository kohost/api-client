import generateFunctions from "../utils/generate";

const base = "sources";
const Sources = generateFunctions(base);

Sources.updatePlayer = function (sourceId) {
  return this.post(`${base}/${sourceId}/player`, {});
};

Sources.browse = {
  get: function (sourceId) {
    const url = `${base}/${sourceId}/browse`;
    return this.get(url);
  },
  genres: {
    getAll: function (sourceId) {
      const url = `${base}/${sourceId}/browse/genres`;
      return this.get(url);
    },
    get: function (sourceId, genreId) {
      const url = `${base}/${sourceId}/browse/genres/${genreId}`;
      return this.get(url);
    },
    getStations: function (sourceId, genreId) {
      const url = `${base}/${sourceId}/browse/genres/${genreId}/stations`;
      return this.get(url);
    },
    update: function (sourceId, body) {
      const url = `${base}/${sourceId}/browse/genres`;
      return this.post(url, body);
    },
  },
  stations: {
    update: function (sourceId, body) {
      const url = `${base}/${sourceId}/browse/stations`;
      return this.post(url, body);
    },
    getAll: function (sourceId) {
      const url = `${base}/${sourceId}/browse/stations`;
      return this.get(url);
    },
  },
};

export default Sources;
