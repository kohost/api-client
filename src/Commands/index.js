const Command = require("./Command");
const SetScene = require("./SetScene");
const SetAlarm = require("./SetAlarm");
const SetDimmer = require("./SetDimmer");
const SetSwitch = require("./SetSwitch");
const SetThermostat = require("./SetThermostat");
const SetLock = require("./SetLock");
const SetWindowCovering = require("./SetWindowCovering");
const SetCourtesy = require("./SetCourtesy");
const SetMedia = require("./SetMedia");
const DiscoverUsers = require("./DiscoverUsers");
const OCRDocument = require("./OCRDocument");
const CheckInReservation = require("./CheckInReservation");
const CheckOutReservation = require("./CheckOutReservation");
const SendEmail = require("./SendEmail");
const SendSMS = require("./SendSMS");
const DiscoverReservations = require("./DiscoverReservations");
const DiscoverReservationSpaceCategoryAvailabilities = require("./DiscoverReservationSpaceCategoryAvailabilities");
const DiscoverRooms = require("./DiscoverRooms");
const DiscoverCategories = require("./DiscoverCategories");
const CreateShortLink = require("./CreateShortLink");
const UpdateReservation = require("./UpdateReservation");
const UpdateUser = require("./UpdateUser");
const GetMobileKey = require("./GetMobileKey");
const CreateImageUploadEndpoint = require("./CreateImageUploadEndpoint");
const UploadImage = require("./UploadImage");
const DiscoverProducts = require("./DiscoverProducts");
const SellProducts = require("./SellProducts");

module.exports = {
  Command,
  SetScene,
  SetAlarm,
  SetDimmer,
  SetSwitch,
  SetThermostat,
  SetLock,
  SetWindowCovering,
  SetCourtesy,
  SetMedia,
  OCRDocument,
  DiscoverUsers,
  CheckInReservation,
  CheckOutReservation,
  SendSMS,
  SendEmail,
  DiscoverReservations,
  DiscoverReservationSpaceCategoryAvailabilities,
  DiscoverRooms,
  DiscoverCategories,
  CreateShortLink,
  UpdateReservation,
  UpdateUser,
  GetMobileKey,
  CreateImageUploadEndpoint,
  UploadImage,
  DiscoverProducts,
  SellProducts,
};
