const SetSceneCommand = require("./SetSceneCommand");
const SetAlarmCommand = require("./SetAlarmCommand");
const SetDimmerCommand = require("./SetDimmerCommand");
const SetSwitchCommand = require("./SetSwitchCommand");
const SetThermostatCommand = require("./SetThermostatCommand");
const SetLockCommand = require("./SetLockCommand");
const SetWindowCoveringCommand = require("./SetWindowCoveringCommand");
const SetCourtesyCommand = require("./SetCourtesyCommand");
const SetMediaCommand = require("./SetMediaCommand");
const DiscoverUsersCommand = require("./DiscoverUsersCommand");
const OCRDocumentCommand = require("./OCRDocumentCommand");
const CheckInReservationCommand = require("./CheckInReservationCommand");
const CheckOutReservationCommand = require("./CheckOutReservationCommand");
const SendEmailCommand = require("./SendEmailCommand");
const SendSMSCommand = require("./SendSMSCommand");
const DiscoverReservationsCommand = require("./DiscoverReservationsCommand");
const DiscoverReservationSpaceCategoryAvailabilitiesCommand = require("./DiscoverReservationSpaceCategoryAvailabilitiesCommand");
const DiscoverRoomsCommand = require("./DiscoverRoomsCommand");
const DiscoverCategoriesCommand = require("./DiscoverCategoriesCommand");
const CreateShortLinkCommand = require("./CreateShortLinkCommand");
const UpdateReservationCommand = require("./UpdateReservationCommand");
const UpdateUserCommand = require("./UpdateUserCommand");
const GetMobileKeyCommand = require("./GetMobileKeyCommand");
const CreateImageUploadEndpointCommand = require("./CreateImageUploadEndpointCommand");
const UploadImageCommand = require("./UploadImageCommand");
const GetProductsCommand = require("./GetProductsCommand");
const SellProductsCommand = require("./SellProductsCommand");

module.exports = {
  SetSceneCommand,
  SetAlarmCommand,
  SetDimmerCommand,
  SetSwitchCommand,
  SetThermostatCommand,
  SetLockCommand,
  SetWindowCoveringCommand,
  SetCourtesyCommand,
  SetMediaCommand,
  OCRDocumentCommand,
  DiscoverUsersCommand,
  CheckInReservationCommand,
  CheckOutReservationCommand,
  SendSMSCommand,
  SendEmailCommand,
  DiscoverReservationsCommand,
  DiscoverReservationSpaceCategoryAvailabilitiesCommand,
  DiscoverRoomsCommand,
  DiscoverCategoriesCommand,
  CreateShortLinkCommand,
  UpdateReservationCommand,
  UpdateUserCommand,
  GetMobileKeyCommand,
  CreateImageUploadEndpointCommand,
  UploadImageCommand,
  GetProductsCommand,
  SellProductsCommand,
};
