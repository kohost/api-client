import {
  Alarm,
  Announcement,
  Camera,
  Category,
  Courtesy,
  Credential,
  DeviceRouter,
  Dimmer,
  DiscoveredDevice,
  EmailMessage,
  EnergyReport,
  EnergyReportShard,
  Gateway,
  Identification,
  Lock,
  MediaFile,
  MediaSource,
  MotionSensor,
  Order,
  Organization,
  Policy,
  Product,
  Property,
  Reservation,
  Room,
  Scene,
  ShortLink,
  SmsMessage,
  Space,
  Switch,
  SystemUser,
  Thermostat,
  Ticket,
  TimeSheet,
  User,
  WindowCovering,
} from "../Models/index";

export default function entityFactory(type: string) {
  switch (type) {
    case "reservation":
      return Reservation;
    case "mediaFile":
      return MediaFile;
    case "switch":
      return Switch;
    case "alarm":
      return Alarm;
    case "dimmer":
      return Dimmer;
    case "lock":
      return Lock;
    case "thermostat":
      return Thermostat;
    case "windowCovering":
      return WindowCovering;
    case "identification":
      return Identification;
    case "user":
      return User;
    case "systemUser":
      return SystemUser;
    case "policy":
      return Policy;
    case "courtesy":
      return Courtesy;
    case "camera":
      return Camera;
    case "motionSensor":
      return MotionSensor;
    case "mediaSource":
      return MediaSource;
    case "room":
      return Room;
    case "space":
      return Space;
    case "category":
      return Category;
    case "ticket":
      return Ticket;
    case "scene":
      return Scene;
    case "gateway":
      return Gateway;
    case "product":
      return Product;
    case "order":
      return Order;
    case "discoveredDevice":
      return DiscoveredDevice;
    case "deviceRouter":
      return DeviceRouter;
    case "credential":
      return Credential;
    case "shortLink":
      return ShortLink;
    case "energyReportShard":
      return EnergyReportShard;
    case "energyReport":
      return EnergyReport;
    case "smsMessage":
      return SmsMessage;
    case "emailMessage":
      return EmailMessage;
    case "announcement":
      return Announcement;
    case "timeSheet":
      return TimeSheet;
    case "property":
      return Property;
    case "organization":
      return Organization;
    default:
      throw new Error("Unknown entity type: " + type);
  }
}
