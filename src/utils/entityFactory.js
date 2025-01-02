const Models = require("../Models");

module.exports = function entityFactory(type) {
  switch (type) {
    case "reservation":
      return Models.Reservation;
    case "mediaFile":
      return Models.MediaFile;
    case "switch":
      return Models.Switch;
    case "alarm":
      return Models.Alarm;
    case "dimmer":
      return Models.Dimmer;
    case "lock":
      return Models.Lock;
    case "thermostat":
      return Models.Thermostat;
    case "windowCovering":
      return Models.WindowCovering;
    case "identification":
      return Models.Identification;
    case "user":
      return Models.User;
    case "systemUser":
      return Models.SystemUser;
    case "policy":
      return Models.Policy;
    case "courtesy":
      return Models.Courtesy;
    case "camera":
      return Models.Camera;
    case "motionSensor":
      return Models.MotionSensor;
    case "mediaSource":
      return Models.MediaSource;
    case "room":
      return Models.Room;
    case "space":
      return Models.Space;
    case "category":
      return Models.Category;
    case "ticket":
      return Models.Ticket;
    case "scene":
      return Models.Scene;
    case "gateway":
      return Models.Gateway;
    case "product":
      return Models.Product;
    case "order":
      return Models.Order;
    case "discoveredDevice":
      return Models.DiscoveredDevice;
    case "deviceRouter":
      return Models.DeviceRouter;
    case "credential":
      return Models.Credential;
    case "shortLink":
      return Models.ShortLink;
    case "energyReportShard":
      return Models.EnergyReportShard;
    case "energyReport":
      return Models.EnergyReport;
    case "smsMessage":
      return Models.SMSMessage;
    case "emailMessage":
      return Models.EmailMessage;
    case "announcement":
      return Models.Announcement;
    case "timeSheet":
      return Models.TimeSheet;
    case "property":
      return Models.Property;
    case "organization":
      return Models.Organization;
    case "issue":
      return Models.Issue;
    case "vendor":
      return Models.Vendor;
    case "log":
      return Models.Log;
    default:
      throw new Error("Unknown entity type: " + type);
  }
};
