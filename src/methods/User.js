import generateFunctions from "../utils/generate";

const base = "/users";

const Users = generateFunctions(base);

function changeAvatar(data) {
  const url = `${base}/change-avatar`;
  return this.http.post(url, data);
}

Users.changeAvatar = changeAvatar;
export default Users;
