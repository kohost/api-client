import merge from "lodash/merge";
import axios from "axios";
import interceptors from "./interceptors";
import Admin from "./methods/Admin";
import Auth from "./methods/Auth";
import Concierge from "./methods/Concierge";
import Controllers from "./methods/Controller";
import Commands from "./methods/Commands";
import Group from "./methods/Group";
import Guest from "./methods/Guest";
import HotelRoom from "./methods/HotelRoom";
import Integrations from "./methods/Integrations";
import Image from "./methods/Image";
import Light from "./methods/Light";
import Privacy from "./methods/Privacy";
import Lock from "./methods/Lock";
import Manager from "./methods/Manager";
import Manifest from "./methods/Manifest";
import Media from "./methods/Media";
import Notifications from "./methods/Notifications";
import Reports from "./methods/Reports";
import Room from "./methods/Room";
import Settings from "./methods/Settings";
import Shade from "./methods/Shade";
import Source from "./methods/Source";
import Structure from "./methods/Structure";
import Subscriptions from "./methods/Subscriptions";
import Thermostat from "./methods/Thermostat";
import User from "./methods/User";

class KohostAPI {
  constructor(url) {
    this.config = {
      url: url,
      version: 2,
      lsAuthTokenKey: "x-auth-token",
      lsRefreshTokenKey: "x-refresh-token",
      lsUserKey: "current-user",
      clientId: undefined,
      secretKey: undefined,
      autoRefreshTokens: true,
      tenant: null,
      onNewToken: function () {},
      onLoginRequired: function () {
        throw new Error("API Client - login required");
      },
    };
    this.isBrowser = typeof window !== "undefined";
    this.authTokenKey = "x-auth-token";
    this.refreshTokenKey = "x-refresh-token";
    this.http = undefined;
    this.authToken = "";
    this.currentUser = undefined;
    this.logger = console;
    // bind methods
    this.config.update = this.updateConfig.bind(this);
    this.handleHTTPResponseError = interceptors.handleHTTPError.bind(this);
    this.handleHTTPResponseSuccess = interceptors.handleHTTPResponse.bind(this);
    this.handleHTTPRequestConfig = interceptors.handleGenerateConfig.bind(this);

    this.Admin = this.bindMethods(Admin);
    this.Auth = this.bindMethods(Auth);

    this.Guest = this.bindMethods(Guest);
    this.User = this.bindMethods(User);

    this.Group = this.bindMethods(Group);
    this.Group.Room = this.bindMethods(Group.Room);
    this.Group.Room.Light = this.bindMethods(Group.Room.Light);
    this.Group.Room.Shade = this.bindMethods(Group.Room.Shade);
    this.Group.Room.Thermostat = this.bindMethods(Group.Room.Thermostat);
    this.Group.Room.Media = this.bindMethods(Group.Room.Media);
    this.Group.Room.Privacy = this.bindMethods(Group.Room.Privacy);
    this.Group.Room.Security = this.bindMethods(Group.Room.Security);
    this.Group.Room.Security.Locks = this.bindMethods(
      Group.Room.Security.Locks
    );
    this.Group.Room.Security.Cameras = this.bindMethods(
      Group.Room.Security.Cameras
    );
    this.HotelRoom = this.bindMethods(HotelRoom);

    this.HotelRoom.Room = this.bindMethods(HotelRoom.Room);
    this.HotelRoom.Guest = this.bindMethods(HotelRoom.Guest);
    this.HotelRoom.Alarms = this.bindMethods(HotelRoom.Alarms);
    this.HotelRoom.Scenes = this.bindMethods(HotelRoom.Scenes);
    this.HotelRoom.Integrations = this.bindMethods(HotelRoom.Integrations);

    this.Room = this.bindMethods(Room);
    this.Room.Light = this.bindMethods(Light);
    this.Room.Shade = this.bindMethods(Shade);
    this.Room.Thermostat = this.bindMethods(Thermostat);
    this.Room.Lock = this.bindMethods(Lock);
    this.Room.Privacy = this.bindMethods(Privacy);
    this.Room.Scenes = this.bindMethods(Room.Scenes);
    this.Room.Media = this.bindMethods(Room.Media);
    this.Room.Security = this.bindMethods(Room.Security);
    this.Room.Security.Locks = this.bindMethods(Room.Security.Locks);
    this.Room.Security.Cameras = this.bindMethods(Room.Security.Cameras);

    this.Settings = this.bindMethods(Settings);
    this.Subscriptions = this.bindMethods(Subscriptions);
    this.Reports = this.bindMethods(Reports);
    this.Controllers = this.bindMethods(Controllers);

    this.Integrations = this.bindMethods(Integrations);
    this.Integrations.Types = this.bindMethods(Integrations.Types);
    this.Integrations.RoomMap = this.bindMethods(Integrations.RoomMap);
    this.Integrations.Metadata = this.bindMethods(Integrations.Metadata);
    this.Integrations.DeviceMap = this.bindMethods(Integrations.DeviceMap);
    this.Concierge = this.bindMethods(Concierge);
    this.Commands = this.bindMethods(Commands);
    this.Image = this.bindMethods(Image);
    this.Source = this.bindMethods(Source);
    this.Source.browse = this.bindMethods(Source.browse);
    this.Source.browse.genres = this.bindMethods(Source.browse.genres);
    this.Source.browse.stations = this.bindMethods(Source.browse.stations);
    this.Structure = this.bindMethods(Structure);
    this.Structure.Images = this.bindMethods(Image);
    this.Media = this.bindMethods(Media);
    this.Manifest = this.bindMethods(Manifest);
    this.Manager = this.bindMethods(Manager);

    this.Notifications = this.bindMethods(Notifications);

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
        "x-tenant-id": this.config.tenant,
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
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (error) {
        return localStorage.getItem(key);
      }
    }
  }

  saveItem(key, data) {
    if (this.isBrowser) {
      if (typeof data === "object") data = JSON.stringify(data);
      localStorage.setItem(key, data);
    }
  }

  removeItem(key) {
    if (this.isBrowser) {
      localStorage.removeItem(key);
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
    return this.config.onLoginRequired();
  }

  handleNewToken(token) {
    return this.config.onNewToken(token);
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

  uploadFile(url, formData, uploadHandler = function () {}) {
    return this.http({
      method: "POST",
      url,
      data: formData,
      onUploadProgress: uploadHandler,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });
  }
}

const API = new KohostAPI();

export default API;
