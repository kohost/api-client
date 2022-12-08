const SetAlarmCommand = require("./SetAlarmCommand");
const SetDimmerCommand = require("./SetDimmerCommand");
const SetSwitchCommand = require("./SetSwitchCommand");
const SetThermostatCommand = require("./SetThermostatCommand");
const SetLockCommand = require("./SetLockCommand");
const SetSceneControllerCommand = require("./SetSceneControllerCommand");
const SetWindowCoveringCommand = require("./SetWindowCoveringCommand");
const SetCourtesyCommand = require("./SetCourtesyCommand");
const DiscoverUsersCommand = require("./DiscoverUsersCommand");
const OCRDocumentCommand = require("./OCRDocumentCommand");
const CheckInReservationCommand = require("./CheckInReservationCommand");
const SendSMSCommand = require("./SendSMSCommand");
const DiscoverReservationsCommand = require("./DiscoverReservationsCommand");
const DiscoverRoomsCommand = require("./DiscoverRoomsCommand");

module.exports = {
  SetAlarmCommand,
  SetDimmerCommand,
  SetSwitchCommand,
  SetThermostatCommand,
  SetLockCommand,
  SetSceneControllerCommand,
  SetWindowCoveringCommand,
  SetCourtesyCommand,
  OCRDocumentCommand,
  DiscoverUsersCommand,
  CheckInReservationCommand,
  SendSMSCommand,
  DiscoverReservationsCommand,
  DiscoverRoomsCommand,
};
