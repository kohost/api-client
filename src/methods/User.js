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

function saveUserData(id, response) {
  // save the new data back to LS if the user is updating itself
  if (id === this.getCurrentUser()._id) {
    const { data, headers } = response;
    // save the current user object
    if (data) {
      const user = data && data[0];
      this.setCurrentUser(user);
    }

    if (headers) {
      // if the user updates itself, the API will send back a new token, lets save it
      const authToken = headers[this.authTokenKey];
      const refreshToken = headers[this.refreshTokenKey];
      if (authToken) this.setAuthToken(authToken);
      if (refreshToken) this.setRefreshToken(refreshToken);
    }
  }
  return response;
}

Users.update = function (id, body) {
  const url = `${base}/${id}`;
  const saveUser = saveUserData.bind(this);
  return this.put(url, body).then((response) => saveUser(id, response));
};

Users.get = function (id) {
  const url = `${base}/${id}`;
  const saveUser = saveUserData.bind(this);
  return this.get(url).then((response) => saveUser(id, response));
};

Users.changeAvatar = changeAvatar;
Users.checkout = checkout;
Users.resetPassword = resetPassword;
Users.invite = invite;

export default Users;
