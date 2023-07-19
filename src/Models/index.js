const Reservation = require("./reservation");
const MediaFile = require("./mediaFile");
const Switch = require("./switch");
const Alarm = require("./alarm");
const Dimmer = require("./dimmer");
const Lock = require("./lock");
const Thermostat = require("./thermostat");
const WindowCovering = require("./windowCovering");
const Identification = require("./identification");
const User = require("./user");
const SystemUser = require("./systemUser");
const Courtesy = require("./courtesy");
const Camera = require("./camera");
const MotionSensor = require("./motionSensor");
const MediaSource = require("./mediaSource");
const Room = require("./room");

const Space = require("./space");
const SpaceType = require("./spaceType");

const Ticket = require("./ticket");
const Scene = require("./scene");
const Gateway = require("./gateway");
const Product = require("./product");
const DiscoveredDevice = require("./discoveredDevice");
const Credential = require("./credential");
const ShortLink = require("./shortLink");
const EnergyReportShard = require("./energyReportShard");
const EnergyReport = require("./energyReport");
const SMSMessage = require("./smsMessage");
const EmailMessage = require("./emailMessage");

const Property = require("./property");
const Organization = require("./organization");

module.exports = {
  Organization,
  Property,
  MediaFile,
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
  SystemUser,
  Room,
  Space,
  SpaceType,
  Ticket,
  Scene,
  DiscoveredDevice,
  Reservation,
  Credential,
  ShortLink,
  EnergyReportShard,
  EnergyReport,
  SMSMessage,
  EmailMessage,
};
