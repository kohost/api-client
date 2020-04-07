import axios from "axios";
import merge from "lodash/merge";
import interceptors from "./interceptors";
import Auth from "./methods/Auth";
import Guest from "./methods/Guest";
import User from "./methods/User";
import HotelRoom from "./methods/HotelRoom";
import Room from "./methods/Room";
import Light from "./methods/Light";
import Shade from "./methods/Shade";
import Thermostat from "./methods/Thermostat";
import Lock from "./methods/Lock";
import Settings from "./methods/Settings";
import Reports from "./methods/Reports";
import Controllers from "./methods/Controller";
import Integrations from "./methods/Integrations";
import Commands from "./methods/Commands";


class KohostApi {
  constructor(url) {
    this.config = {
      url: url,
      version: 2,
      lsAuthTokenKey: "x-auth-token",
      lsRefreshTokenKey: "x-refresh-token",
      lsUserKey: "current-user",
      onLoginRequired: function () {
        throw new Error("Login required");
      },
    };
    this.isBrowser = typeof window !== "undefined";
    this.authTokenKey = "x-auth-token";
    this.refreshTokenKey = "x-refresh-token";
    this.http = undefined;
    this.authToken = undefined;
    this.refreshToken = undefined;
    this.currentUser = undefined;
    this.logger = console;
    // bind methods
    this.config.update = this.updateConfig.bind(this);
    this.handleHTTPResponseError = interceptors.handleHTTPError.bind(this);
    this.handleHTTPResponseSuccess = interceptors.handleHTTPResponse.bind(this);
    this.handleHTTPRequestConfig = interceptors.handleGenerateConfig.bind(this);

    this.Auth = this.bindMethods(Auth);
    this.Guest = this.bindMethods(Guest);
    this.User = this.bindMethods(User);

    this.HotelRoom = this.bindMethods(HotelRoom);
    this.HotelRoom.Room = this.bindMethods(HotelRoom.Room);
    this.HotelRoom.Guest = this.bindMethods(HotelRoom.Guest);
    this.HotelRoom.Scenes = this.bindMethods(HotelRoom.Scenes);
    this.HotelRoom.Integrations = this.bindMethods(HotelRoom.Integrations);

    this.Room = this.bindMethods(Room);
    this.Room.Light = this.bindMethods(Light);
    this.Room.Shade = this.bindMethods(Shade);
    this.Room.Thermostat = this.bindMethods(Thermostat);
    this.Room.Lock = this.bindMethods(Lock);
    this.Settings = this.bindMethods(Settings);
    this.Reports = this.bindMethods(Reports);
    this.Controllers = this.bindMethods(Controllers);
    this.Integrations = this.bindMethods(Integrations);
    this.Commands = this.bindMethods(Commands);

    this.createHTTPClient();
  }

  bindMethods(funcObject) {
    const bindMethod = (func) => {
      return func.bind(this);
    };
    const boundMethods = {};
    Object.keys(funcObject).forEach((method) => {
      if (typeof funcObject[method] !== "function") return;
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
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    this.http.interceptors.response.use(
      this.handleHTTPResponseSuccess,
      this.handleHTTPResponseError
    );
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
    this.currentUser = user;
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

  getCurrentUser() {
    if (this.isBrowser) return this.getItem(this.config.lsUserKey);
    return this.currentUser;
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
    options.data = body;
    return this.http.delete(url, options);
  }
}

const API = new KohostApi();

export default API;
