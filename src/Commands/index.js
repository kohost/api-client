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
const GetUsers = require("./GetUsers");
const OCRDocument = require("./OCRDocument");
const CheckInReservation = require("./CheckInReservation");
const CheckOutReservation = require("./CheckOutReservation");
const SendEmail = require("./SendEmail");
const SendSMS = require("./SendSMS");
const GetReservations = require("./GetReservations");
const GetReservationSpaceCategoryAvailabilities = require("./GetReservationSpaceCategoryAvailabilities");
const GetRooms = require("./GetRooms");
const GetCategories = require("./GetCategories");
const CreateShortLink = require("./CreateShortLink");
const UpdateReservation = require("./UpdateReservation");
const UpdateUser = require("./UpdateUser");
const GetMobileKey = require("./GetMobileKey");
const CreateImageUploadEndpoint = require("./CreateImageUploadEndpoint");
const UploadImage = require("./UploadImage");
const GetProducts = require("./GetProducts");
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
  GetUsers,
  CheckInReservation,
  CheckOutReservation,
  SendSMS,
  SendEmail,
  GetReservations,
  GetReservationSpaceCategoryAvailabilities,
  GetRooms,
  GetCategories,
  CreateShortLink,
  UpdateReservation,
  UpdateUser,
  GetMobileKey,
  CreateImageUploadEndpoint,
  UploadImage,
  GetProducts,
  SellProducts,
};
