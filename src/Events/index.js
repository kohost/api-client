const Event = require("./Event");
const SystemGatewayUpdated = require("./SystemGatewayUpdated");
const SystemThermostatUpdated = require("./SystemThermostatUpdated");
const SystemDimmerUpdated = require("./SystemDimmerUpdated");
const SystemSwitchUpdated = require("./SystemSwitchUpdated");
const SystemLockUpdated = require("./SystemLockUpdated");
const SystemCameraUpdated = require("./SystemCameraUpdated");
const SystemWindowCoveringUpdated = require("./SystemWindowCoveringUpdated");
const SystemMediaSourceUpdated = require("./SystemMediaSourceUpdated");
const SystemCourtesyUpdated = require("./SystemCourtesyUpdated");
const SystemAlarmUpdated = require("./SystemAlarmUpdated");
const SystemMotionSensorUpdated = require("./SystemMotionSensorUpdated");
const SystemPropertyUpdated = require("./SystemPropertyUpdated");
const SystemOrganizationUpdated = require("./SystemOrganizationUpdated");
const SystemCredentialUpdated = require("./SystemCredentialUpdated");

const SceneSetEvent = require("./SceneSet");

const SystemUserUpdated = require("./SystemUserUpdated");
const SystemSpaceUpdated = require("./SystemSpaceUpdated");
const SystemCategoryUpdated = require("./SystemCategoryUpdated");
const SystemProductUpdated = require("./SystemProductUpdated");

const SystemReservationUpdated = require("./SystemReservationUpdated");

const SMSEvent = require("./SMSEvent");
const EmailEvent = require("./EmailEvent");
const ShortLinkCreated = require("./ShortLinkCreated");

const ApplicationInUse = require("./ApplicationInUse");
const ApplicationOutOfUse = require("./ApplicationOutOfUse");

const ReservationCheckedIn = require("./ReservationCheckedIn");
const ReservationCheckedOut = require("./ReservationCheckedOut");
const ReservationSpaceChanged = require("./ReservationSpaceChanged");

// Delete Events
const SystemEntityDeleted = require("./SystemEntityDeleted");

module.exports = {
  Event,
  SystemAlarmUpdated,
  SystemCredentialUpdated,
  SystemGatewayUpdated,
  SystemThermostatUpdated,
  SystemDimmerUpdated,
  SystemSwitchUpdated,
  SystemLockUpdated,
  SystemCameraUpdated,
  SystemWindowCoveringUpdated,
  SystemMediaSourceUpdated,
  SystemMotionSensorUpdated,
  SystemCourtesyUpdated,
  SystemUserUpdated,
  SystemSpaceUpdated,
  SystemCategoryUpdated,
  SystemProductUpdated,
  SystemPropertyUpdated,
  SystemOrganizationUpdated,
  SystemReservationUpdated,
  SystemEntityDeleted,
  SceneSetEvent,
  SMSEvent,
  EmailEvent,
  ShortLinkCreated,
  ApplicationInUse,
  ApplicationOutOfUse,
  ReservationCheckedIn,
  ReservationCheckedOut,
  ReservationSpaceChanged,
};
