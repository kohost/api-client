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

const Guest = generateFunctions(base);

Guest.checkIn = checkInGuest;
Guest.checkOut = checkOutGuest;

export default Guest;
