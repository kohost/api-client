const IotGateway = require("./iotGateway");
const Switch = require("./switch");
const Alarm = require("./alarm");
const Dimmer = require("./dimmer");
const Lock = require("./lock");
const SceneController = require("./sceneController");
const Thermostat = require("./thermostat");
const WindowCovering = require("./windowCovering");
const User = require("./user");
const ACL = require("./acl");
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
const Integration = require("./integration");
const Gateway = require("./gateway");
const DiscoveredDevice = require("./discoveredDevice");

const AdminCustomer = require("./admin/customer");
const AdminProperty = require("./admin/property");

module.exports = {
  Admin: {
    Customer: AdminCustomer,
    Property: AdminProperty,
  },
  Gateway,
  IotGateway,
  Switch,
  Alarm,
  Dimmer,
  Lock,
  Courtesy,
  Camera,
  SceneController,
  MotionSensor,
  Thermostat,
  WindowCovering,
  MediaSource,
  User,
  ACL,
  Room,
  Application, 
  Space,
  Ticket,
  Scene,
  Integration,
  DiscoveredDevice,
  Reservation,
};
