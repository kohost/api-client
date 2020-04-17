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

function invite(id) {
  const url = `${base}/${id}/invite`;
  return this.post(url);
}

function resetPassword(userID, { password, resetToken }) {
  const url = base + `/${userID}/reset-password`;
  return this.post(url, { password, resetToken }).then((response) => {
    if (response.status >= 400 && response.status <= 500) {
      body.error = response.data.error;
      return body;
    } else {
      return true;
    }
  });
}

Users.changeAvatar = changeAvatar;
Users.checkout = checkout;
Users.resetPassword = resetPassword;
Users.invite = invite;

export default Users;
