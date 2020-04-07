import generateFunctions from "../utils/generate";

const base = "/guests";

function checkInGuest(id, body) {
  const url = `${base}/${id}/checkin`;
  return this.post(url, body);
}

function checkOutGuest(id, body) {
  const url = `${base}/${id}/checkout`;
  return this.post(url, body);
}

function invite(id) {
  const url = `${base}/${id}/invite`;
  return this.post(url);
}

const Guest = generateFunctions(base);
Guest.checkIn = checkInGuest;
Guest.checkOut = checkOutGuest;
Guest.invite = invite;

export default Guest;
