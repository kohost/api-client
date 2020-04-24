const base = "/manifest.json";

const Manifest = {};

function get() {
  return this.get(base);
}

Manifest.get = get;

export default Manifest;
