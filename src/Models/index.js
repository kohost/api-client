const Switch = require("./switch");
const Alarm = require("./alarm");
const Dimmer = require("./dimmer");
const Lock = require("./lock");
const Thermostat = require("./thermostat");
const WindowCovering = require("./windowCovering");
const Identification = require("./identification");
const User = require("./user");
const Courtesy = require("./courtesy");
const Camera = require("./camera");
const MotionSensor = require("./motionSensor");
const MediaSource = require("./mediaSource");
const Room = require("./room");
const Reservation = require("./reservation");
const Application = require("./application");
const Space = require("./space");
const Ticket = require("./ticket");
const Scene = require("./scene");
const Gateway = require("./gateway");
const Product = require("./product");
const DiscoveredDevice = require("./discoveredDevice");
const Credential = require("./credential");
const ShortLink = require("./shortLink");

const AdminCustomer = require("./admin/customer");
const AdminProperty = require("./admin/property");

module.exports = {
  Admin: {
    Customer: AdminCustomer,
    Property: AdminProperty,
  },
  Gateway,
  Switch,
  Alarm,
  Dimmer,
  Lock,
  Courtesy,
  Camera,
  MotionSensor,
  Thermostat,
  WindowCovering,
  MediaSource,
  Identification,
  Product,
  User,
  Room,
  Application,
  Space,
  Ticket,
  Scene,
  DiscoveredDevice,
  Reservation,
  Credential,
  ShortLink,
};
