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
const SendEmailCommand = require("./SendEmailCommand");
const SendSMSCommand = require("./SendSMSCommand");
const DiscoverReservationsCommand = require("./DiscoverReservationsCommand");
const DiscoverRoomsCommand = require("./DiscoverRoomsCommand");
const DiscoverRoomTypesCommand = require("./DiscoverRoomTypesCommand");
const CreateShortLinkCommand = require("./CreateShortLinkCommand");
const UpdateReservationCommand = require("./UpdateReservationCommand");
const UpdateUserCommand = require("./UpdateUserCommand");
const GetMobileKeyCommand = require("./GetMobileKeyCommand");
const CreateImageUploadEndpointCommand = require("./CreateImageUploadEndpointCommand");
const UploadImageCommand = require("./UploadImageCommand");

module.exports = {
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
  SendSMSCommand,
  SendEmailCommand,
  DiscoverReservationsCommand,
  DiscoverRoomsCommand,
  DiscoverRoomTypesCommand,
  CreateShortLinkCommand,
  UpdateReservationCommand,
  UpdateUserCommand,
  GetMobileKeyCommand,
  CreateImageUploadEndpointCommand,
  UploadImageCommand,
};
