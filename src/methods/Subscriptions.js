const base = "/subscription";

function getAll() {
  return this.http.get(`${base}`, {});
}

function get(user) {
  return this.http.get(`${base}/${user}`, {});
}

function add(body) {
  return this.http.post(`${base}`, body);
}

function deleteSubscription(id) {
  return this.http.delete(`${base}/${id}`, {});
}

const Subscriptions = { add, get, getAll, delete: deleteSubscription };

export default Subscriptions;
