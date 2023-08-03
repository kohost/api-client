const Reservation = require("./Reservation");
const MediaFile = require("./MediaFile");
const Switch = require("./Switch");
const Alarm = require("./Alarm");
const Dimmer = require("./Dimmer");
const Lock = require("./Lock");
const Thermostat = require("./Thermostat");
const WindowCovering = require("./WindowCovering");
const Identification = require("./Identification");
const User = require("./User");
const SystemUser = require("./SystemUser");
const Courtesy = require("./Courtesy");
const Camera = require("./Camera");
const MotionSensor = require("./MotionSensor");
const MediaSource = require("./MediaSource");
const Room = require("./Room");

const Space = require("./Space");
const SpaceType = require("./SpaceType");

const Ticket = require("./Ticket");
const Scene = require("./Scene");
const Gateway = require("./Gateway");
const Product = require("./Product");
const Order = require("./Order");
const DiscoveredDevice = require("./DiscoveredDevice");
const Credential = require("./Credential");
const ShortLink = require("./ShortLink");
const EnergyReportShard = require("./EnergyReportShard");
const EnergyReport = require("./EnergyReport");
const SMSMessage = require("./SmsMessage");
const EmailMessage = require("./EmailMessage");

const Property = require("./Property");
const Organization = require("./Organization");

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
  Order,
};
