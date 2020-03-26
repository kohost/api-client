import axios from "axios";
import merge from "lodash/merge";
import interceptors from "./interceptors";
import Room from "./methods/Room";
import Auth from "./methods/Auth";
import HotelRoom from "./methods/HotelRoom";

class KohostApi {
  constructor(url) {
    this.config = {
      url: url,
      version: 2,
      lsAuthTokenKey: "x-auth-token",
      lsRefreshTokenKey: "x-refresh-token",
      lsUserKey: "current-user",
      onLoginRequired: function() {
        throw (new Er(), ror("Login required"));
      }
    };
    this.isBrowser = typeof window !== "undefined";
    this.authTokenKey = "x-auth-token";
    this.refreshTokenKey = "x-refresh-token";
    this.http = undefined;
    this.authToken = undefined;
    this.refreshToken = undefined;
    this.logger = console;
    // bind methods
    this.config.update = this.updateConfig.bind(this);
    this.handleHTTPResponseError = interceptors.handleHTTPError.bind(this);
    this.handleHTTPRequestConfig = interceptors.handleGenerateConfig.bind(this);

    this.Room = this.bindMethods(Room);
    this.Auth = this.bindMethods(Auth);
    this.HotelRoom = this.bindMethods(HotelRoom);

    this.createHTTPClient();
  }

  bindMethods(funcObject) {
    const bindMethod = func => {
      return func.bind(this);
    };
    const boundMethods = {};
    Object.keys(funcObject).forEach(method => {
      boundMethods[method] = bindMethod(funcObject[method]);
    });

    return boundMethods;
  }

  updateConfig(config) {
    this.config = merge(this.config, config);
    this.createHTTPClient();
  }

  createHTTPClient() {
    this.http = axios.create({
      baseURL: this.config.url,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });

    this.http.interceptors.response.use(null, this.handleHTTPResponseError);
    this.http.interceptors.request.use(this.handleHTTPRequestConfig, null);
  }

  getItem(key) {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
  }

  saveItem(key, data) {
    if (this.isBrowser) {
      if (typeof data === "object") data = JSON.stringify(data);
      localStorage.setItem(key, data);
    }
  }

  setAuthToken(token) {
    this.authToken = token;
    this.saveItem(this.config.lsAuthTokenKey, token);
  }

  setRefreshToken(token) {
    this.refreshToken = token;
    this.saveItem(this.config.lsRefreshTokenKey, token);
  }

  setCurrentUser(user) {
    this.saveItem(this.config.lsUserKey, user);
  }

  getAuthToken() {
    if (this.isBrowser) return this.getItem(this.config.lsAuthTokenKey);
    return this.authToken;
  }

  getRefreshToken() {
    if (this.isBrowser) return this.getItem(this.config.lsRefreshTokenKey);
    return this.refreshToken;
  }

  handleLoginRequired() {
    console.log("require login");
    return this.config.onLoginRequired();
  }

  handleLogAndNotifyError(error) {
    this.logger.log(error);
  }

  get(url, options = {}) {
    return this.http.get(url, options);
  }

  post(url, body, options = {}) {
    return this.http.post(url, body, options);
  }

  put(url, body, options = {}) {
    return this.http.put(url, body, options);
  }

  delete(url, body, options = {}) {
    return this.http.delete(url, body, options);
  }
}

export default new KohostApi();
