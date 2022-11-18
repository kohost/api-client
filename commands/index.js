const SetAlarmCommand = require("./SetAlarmCommand");
const SetDimmerCommand = require("./SetDimmerCommand");
const SetSwitchCommand = require("./SetSwitchCommand");
const SetThermostatCommand = require("./SetThermostatCommand");
const SetLockCommand = require("./SetLockCommand");
const SetSceneControllerCommand = require("./SetSceneControllerCommand");
const SetWindowCoveringCommand = require("./SetWindowCoveringCommand");
const SetCourtesyCommand = require("./SetCourtesyCommand");

const DiscoverUsersCommand = require("./DiscoverUsersCommand");

const VerifyDocumentCommand = require("./VerifyDocumentCommand");

module.exports = {
  SetAlarmCommand,
  SetDimmerCommand,
  SetSwitchCommand,
  SetThermostatCommand,
  SetLockCommand,
  SetSceneControllerCommand,
  SetWindowCoveringCommand,
  SetCourtesyCommand,
  VerifyDocumentCommand,
  DiscoverUsersCommand,
};
