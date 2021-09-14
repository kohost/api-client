const base = "/auth";

async function requestNewTokens() {
  if (!this.getRefreshToken()) return this.handleLoginRequired();
  return this.post(
    `${base}/token`,
    {},
    {
      headers: {
        [this.refreshTokenKey]: this.getRefreshToken(),
      },
    }
  ).then((response) => {
    this.setAuthToken(response.headers[this.authTokenKey]);
    this.setRefreshToken(response.headers[this.refreshTokenKey]);
    return response;
  });
}

function loginUser(email, password) {
  const url = `${base}/user`;
  return this.post(url, { email: email.toLowerCase(), password }).then(
    (response) => {
      const authToken = response.headers[this.authTokenKey];
      const refreshToken = response.headers[this.refreshTokenKey];
      const user = response.data[0];
      this.setAuthToken(authToken);
      this.setRefreshToken(refreshToken);
      this.setCurrentUser(user);
      return response;
    }
  );
}

function loginGuest(lastName, roomNumber, phone) {
  const url = `${base}/guest`;
  return this.post(url, { lastName, roomNumber, phone }).then((response) => {
    const authToken = response.headers[this.authTokenKey];
    const refreshToken = response.headers[this.refreshTokenKey];
    const user = response.data[0];
    this.setAuthToken(authToken);
    this.setRefreshToken(refreshToken);
    this.setCurrentUser(user);
    return response;
  });
}

function resetPassword(userID, password, token) {
  const url = base + `/${userID}/set-password`;
  let options = {};
  if (token) {
    options.headers = {
      "x-reset-token": token,
    };
  }

  return this.post(url, { password }, options).then((response) => {
    if (response.status >= 400 && response.status <= 500) {
      body.error = response.data.error;
      return body;
    } else {
      return true;
    }
  });
}

function verifyToken(token) {
  const url = base + `/verifyToken`;
  return this.post(url, { token }).then((response) => {
    if (response.status >= 400 && response.status <= 500) {
      body.error = response.data.error;
      return body;
    } else {
      return response;
    }
  });
}

function sendResetPasswordLink(userId) {
  const url = base + `/${userId}/sendResetPasswordLink`;
  return this.post(url, {}).then((response) => {
    if (response.status >= 400 && response.status <= 500) {
      body.error = response.data.error;
      return body;
    } else {
      return response;
    }
  });
}

function forgotPassword(email) {
  const url = `/users/forgot-password`;
  return this.post(url, { email }).then((response) => {
    if (response.status >= 400 && response.status <= 500) {
      body.error = response.data.error;
      return body;
    } else {
      return response;
    }
  });
}

function getNewControllerAuthToken(authKey, controllerId) {
  const url = `${base}/controller`;
  return this.post(url, { authKey, controllerId })
    .then((response) => {
      if (response.status >= 400 && response.status <= 500) {
        body.error = response.data.error;
        return body;
      } else {
        this.setAuthToken(response.headers[this.authTokenKey]);
        return response;
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function logout() {
  this.setAuthToken(null);
  this.setRefreshToken(null);
  this.setCurrentUser(null);
  this.removeItem(this.config.lsAuthTokenKey);
  this.removeItem(this.config.lsRefreshTokenKey);
  this.removeItem(this.config.lsUserKey);
}

const Auth = {
  requestNewTokens,
  loginUser,
  loginGuest,
  resetPassword,
  verifyToken,
  sendResetPasswordLink,
  forgotPassword,
  getNewControllerAuthToken,
  logout,
};

export default Auth;
