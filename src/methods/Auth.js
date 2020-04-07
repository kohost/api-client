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
  )
    .then((response) => {
      this.setAuthToken(response.headers[this.authTokenKey]);
      this.setRefreshToken(response.headers[this.refreshTokenKey]);
      return response;
    })
    .catch((error) => this.handleLogAndNotifyError(error));
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
function resetPassword(userID, password) {
  const url = base + `/${userID}/set-password`;
  return this.post(url, { password }).then(
    (response) => {
      if (response.status >= 400 && response.status <= 500) {
        body.error = response.data.error;
        return body;
      } else {
        return true;
      }
    }
  );
}

const Auth = {
  requestNewTokens,
  loginUser,
  resetPassword
};

export default Auth;
