import generateFunctions from "../utils/generate";

const base = "/users";

const Users = generateFunctions(base);

function changeAvatar(data) {
  const url = `${base}/change-avatar`;
  return this.http.post(url, data);
}


function checkout() {
  const url = `${base}/checkout`;
  return this.http.post(url);
}

Users.changeAvatar = changeAvatar;
Users.checkout = checkout;
export default Users;
