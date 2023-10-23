const SystemGatewayUpdatedEvent = require("./SystemGatewayUpdatedEvent");
const SystemThermostatUpdatedEvent = require("./SystemThermostatUpdatedEvent");
const SystemDimmerUpdatedEvent = require("./SystemDimmerUpdatedEvent");
const SystemSwitchUpdatedEvent = require("./SystemSwitchUpdatedEvent");
const SystemLockUpdatedEvent = require("./SystemLockUpdatedEvent");
const SystemCameraUpdatedEvent = require("./SystemCameraUpdatedEvent");
const SystemSceneControllerUpdatedEvent = require("./SystemSceneControllerUpdatedEvent");
const SystemWindowCoveringUpdatedEvent = require("./SystemWindowCoveringUpdatedEvent");
const SystemMediaSourceUpdatedEvent = require("./SystemMediaSourceUpdatedEvent");
const SystemCourtesyUpdatedEvent = require("./SystemCourtesyUpdatedEvent");
const SystemAlarmUpdatedEvent = require("./SystemAlarmUpdatedEvent");
const SystemMotionSensorUpdatedEvent = require("./SystemMotionSensorUpdatedEvent");
const SystemPropertyUpdatedEvent = require("./SystemPropertyUpdatedEvent");
const SystemOrganizationUpdatedEvent = require("./SystemOrganizationUpdatedEvent");
const SystemCredentialUpdatedEvent = require("./SystemCredentialUpdatedEvent");

const SceneSetEvent = require("./SceneSetEvent");

const SystemUserUpdatedEvent = require("./SystemUserUpdatedEvent");
const SystemSpaceUpdatedEvent = require("./SystemSpaceUpdatedEvent");
const SystemCategoryUpdatedEvent = require("./SystemCategoryUpdatedEvent");
const SystemProductUpdatedEvent = require("./SystemProductUpdatedEvent");

const SystemReservationUpdatedEvent = require("./SystemReservationUpdatedEvent");

const SMSEvent = require("./SMSEvent");
const EmailEvent = require("./EmailEvent");
const ShortLinkCreatedEvent = require("./ShortLinkCreatedEvent");

const ApplicationInUseEvent = require("./ApplicationInUseEvent");
const ApplicationOutOfUseEvent = require("./ApplicationOutOfUseEvent");

const ReservationCheckInEvent = require("./ReservationCheckInEvent");
const ReservationCheckOutEvent = require("./ReservationCheckOutEvent");


// Delete Events
const SystemEntityDeletedEvent = require("./SystemEntityDeletedEvent");


module.exports = {
  SystemAlarmUpdatedEvent,
  SystemCredentialUpdatedEvent,
  SystemGatewayUpdatedEvent,
  SystemThermostatUpdatedEvent,
  SystemDimmerUpdatedEvent,
  SystemSwitchUpdatedEvent,
  SystemLockUpdatedEvent,
  SystemCameraUpdatedEvent,
  SystemSceneControllerUpdatedEvent,
  SystemWindowCoveringUpdatedEvent,
  SystemMediaSourceUpdatedEvent,
  SystemMotionSensorUpdatedEvent,
  SystemCourtesyUpdatedEvent,
  SystemUserUpdatedEvent,
  SystemSpaceUpdatedEvent,
  SystemCategoryUpdatedEvent,
  SystemProductUpdatedEvent,
  SystemPropertyUpdatedEvent,
  SystemOrganizationUpdatedEvent,
  SystemReservationUpdatedEvent,
  SystemEntityDeletedEvent,
  SceneSetEvent,
  SMSEvent,
  EmailEvent,
  ShortLinkCreatedEvent,
  ApplicationInUseEvent,
  ApplicationOutOfUseEvent,
  ReservationCheckInEvent,
  ReservationCheckOutEvent
};
